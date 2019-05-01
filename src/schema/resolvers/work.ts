import { ApolloError } from 'apollo-server';
// import { processSingleUpload, processBulkUpload } from '../../services/cloudinary';
import { processSingleUpload, processBulkUpload, deleteFiles } from '../../services/s3';

import _ from 'lodash';

export default {
    Work: {
        category: (parent: any, args: any, { models }: any) => {
            return models.Category.findById(parent.category);
        },
    },
    Query: {
        work: (parent: any, { id }: any, { models }: any) => {
            return models.Work.findById(id);
        },
        works: (parent: any, args: any, { models }: any) => {
            return models.Work.find();
        },
    },
    Mutation: {
        addWork: async (parent: any, { input }: any, { models }: any) => {
            try {
                const thumbnailResult: any = await processSingleUpload(input.thumbnail, 'work/thumbnails');
                const imagesResult = await processBulkUpload(input.images, 'work/images');
                const imagesUrls = imagesResult.map((i: any) => ({ url: i.Location, key: i.key }));

                return new models.Work({
                    title: input.title,
                    description: input.description,
                    category: input.category,
                    thumbnail: { url: thumbnailResult.Location, key: thumbnailResult.key },
                    tags: input.tags,
                    published: input.published,
                    images: imagesUrls,
                }).save();
            } catch (err) {
                throw new ApolloError(err);
            }
        },
        editWork: async (parent: any, { id, input }: any, { models }: any) => {
            try {
                const alredyUploadedImagesUrls = input.images.filter((i: any) => !!i.key);
                const newImages = input.images.filter((i: any) => !i.key);
                let allImagesUrls = [...alredyUploadedImagesUrls];
                let thumbnailData;

                // upload thumbnail and store url if it does not exist
                if (!input.thumbnail.url) {
                    const { Location, key }: any = await processSingleUpload(input.thumbnail, 'work/thumbnails');
                    thumbnailData = { url: Location, key };
                } else {
                    thumbnailData = input.thumbnail;
                }

                // upload new images
                if (newImages.length) {
                    const newImagesUploadResult = await processBulkUpload(newImages, 'work/images');
                    const newImagesUrls = newImagesUploadResult.map((i: any) => ({ url: i.Location, key: i.key }));
                    allImagesUrls = [...allImagesUrls, ...newImagesUrls];
                }

                // delete images from s3 if removed in client
                const work = await models.Work.findById(id);
                const imagesToDelete = _.difference(work.images, alredyUploadedImagesUrls, 'key');
                await deleteFiles(imagesToDelete);

                return models.Work.findByIdAndUpdate(id, {
                    title: input.title,
                    description: input.description,
                    category: input.category,
                    thumbnail: thumbnailData,
                    tags: input.tags,
                    published: input.published,
                    images: allImagesUrls,
                });
            } catch (err) {
                throw new ApolloError(err);
            }
        },
        setWorkVisibility: async (parent: any, { id, published }: any, { models }: any) => {
            return models.Work.findOneAndUpdate({ _id: id }, { published }, { new: true });
        },
        deleteWork: async (parent: any, { id }: any, { models }: any) => {
            return models.Work.findByIdAndRemove(id);
        },
    },
};
