import { Request, Response } from 'express';
import aws from 'aws-sdk';
import uuidv4 from 'uuid/v4';
import multer from 'multer';
import multerS3 from 'multer-s3';

import models from '../models';
import { s3 } from '../services/s3';

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'iamhrayr-portfolio',
        acl: 'public-read',
        key(req, file, cb) {
            const key = `work/${file.fieldname}/${uuidv4()}-${file.originalname}`;
            cb(null, key);
        },
    }),
});

export default {
    getWorks: async (req: Request, res: Response) => {
        try {
            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 10;

            const works = await models.Work.paginate({}, { page, limit });

            return res.send(works);
        } catch (err) {
            return res.status(400).send(err);
        }
    },

    addWorkImages: upload.fields([{ name: 'thumbnails', maxCount: 1 }, { name: 'images' }]),
    addWork: async (req: Request, res: Response) => {
        try {
            res.send('success');

            // const skill = await new models.Skill({
            //     title: req.body.title,
            //     description: req.body.description,
            //     color: req.body.color,
            // }).save();

            // return res.send(skill);
        } catch (err) {
            return res.status(400).send(err);
        }
    },

    // editWork: async (req: Request, res: Response) => {
    //     try {
    //         const { id } = req.params;

    //         const updatedSkill = await models.Skill.findByIdAndUpdate(id, { $set: req.body }, { new: true });

    //         return res.send(updatedSkill);
    //     } catch (err) {
    //         return res.status(400).send(err);
    //     }
    // },

    // deleteWork: async (req: Request, res: Response) => {
    //     try {
    //         const { id } = req.params;
    //         const deletedSkill = await models.Skill.findByIdAndDelete(id);

    //         return res.send(deletedSkill);
    //     } catch (err) {
    //         return res.status(400).send(err);
    //     }
    // },
};
