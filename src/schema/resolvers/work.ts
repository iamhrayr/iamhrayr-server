import { ApolloError } from 'apollo-server';
// import { processSingleUpload, processBulkUpload } from '../../services/cloudinary';
import { processSingleUpload, processBulkUpload } from '../../services/s3';

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
                const imagesResult = await processBulkUpload(input.images, 'work/images');
                const imagesUrls = imagesResult.map((i: any) => i.Location);
                const { Location }: any = await processSingleUpload(input.thumbnail, 'work/thumbnails');

                return new models.Work({
                    title: input.title,
                    description: input.description,
                    category: input.category,
                    thumbnail: Location,
                    tags: input.tags,
                    published: input.published,
                    images: imagesUrls,
                }).save();
            } catch (err) {
                throw new ApolloError(err);
            }
        },
        editWork: async (parent: any, { id, input }: any, { models }: any) => {
            const { url } = await processSingleUpload(input.thumbnail, 'iamhrayr-portfolio/thumbnails/');
            const imagesResult = await processBulkUpload(input.images, 'iamhrayr-portfolio/works/');
            const imagesUrls = imagesResult.map((i: any) => i.url);

            return models.Work.findByIdAndUpdate(id, {
                title: input.title,
                description: input.description,
                category: input.category,
                thumbnail: url,
                tags: input.tags,
                published: input.published,
                images: imagesUrls,
            });
        },
        setWorkVisibility: async (parent: any, { id, published }: any, { models }: any) => {
            return models.Work.findOneAndUpdate({ _id: id }, { published }, { new: true });
        },
        deleteWork: async (parent: any, { id }: any, { models }: any) => {
            return models.Work.findByIdAndRemove(id);
        },
    },
};
