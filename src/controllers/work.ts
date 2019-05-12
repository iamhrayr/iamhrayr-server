import { Request, Response } from 'express';
import uuidv4 from 'uuid/v4';
import multer from 'multer';
import multerS3 from 'multer-s3';
import _ from 'lodash';

import models from '../models';
import { s3, deleteFiles } from '../services/s3';

export const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'iamhrayr-portfolio',
        acl: 'public-read',
        key(req, file, cb) {
            const folder = file.fieldname === 'thumbnail' ? 'thumbnails' : file.fieldname;
            const key = `work/${folder}/${uuidv4()}-${file.originalname}`;
            cb(null, key);
        },
    }),
});

export default {
    getAllWork: async (req: Request, res: Response) => {
        try {
            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 10;

            const opt = { page, limit, populate: 'category' };
            const works = await models.Work.paginate({}, opt);

            return res.send(works);
        } catch (err) {
            return res.status(400).send(err);
        }
    },

    getOneWork: async (req: Request, res: Response) => {
        try {
            const work = await models.Work.findById(req.params.id).populate('category');
            if (!work) {
                return res.status(404).send({ message: `work with provided id does not exist` });
            }

            return res.send(work);
        } catch (err) {
            return res.status(400).send(err);
        }
    },

    createWork: async (req: Request, res: Response) => {
        try {
            const { files }: any = req;
            if (!files.thumbnail || !files.images) {
                return res.status(400).send({ error: true, message: 'images are required' });
            }

            const thumbnail = {
                url: files.thumbnail[0].location,
                key: files.thumbnail[0].key,
            };

            const images = files.images.map((i: any) => ({
                url: i.location,
                key: i.key,
            }));

            const work = await new models.Work({
                thumbnail,
                images,
                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
                tags: req.body.tags,
                published: req.body.published,
            }).save();

            if (work.errors) {
                deleteFiles([thumbnail, ...images]);
            }

            return res.send(work);
        } catch (err) {
            return res.status(400).send(err);
        }
    },

    updateWork: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { files }: any = req;

            const alredyUploadedImages = req.body.images || [];
            const newImages = files.images ? files.images.map((i: any) => ({ url: i.location, key: i.key })) : [];
            const allImagesUrls = [...alredyUploadedImages, ...newImages];

            // upload thumbnail and store url if it changed
            let thumbnailData;
            if (files.thumbnail) {
                thumbnailData = { url: files.thumbnail.location, key: files.thumbnail.key };
            } else {
                thumbnailData = req.body.thumbnail;
            }

            // delete images from s3 if removed in client
            const work = await models.Work.findById(id);
            if (work) {
                const imagesToDelete = _.differenceBy(work.images, alredyUploadedImages, 'key');
                if (imagesToDelete.length > 0) {
                    deleteFiles(imagesToDelete);
                }
                if (thumbnailData.key !== work.thumbnail.key) {
                    deleteFiles(work.thumbnail.key);
                }
            }

            const updatedData = await models.Work.findByIdAndUpdate(
                id,
                { ...req.body, thumbnail: thumbnailData, images: allImagesUrls },
                { new: true },
            );

            return res.send(updatedData);
        } catch (err) {
            return res.status(400).send(err);
        }
    },

    deleteWork: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const deletedWork = await models.Work.findByIdAndDelete(id);
            return res.send(deletedWork);
        } catch (err) {
            return res.status(400).send(err);
        }
    },
};
