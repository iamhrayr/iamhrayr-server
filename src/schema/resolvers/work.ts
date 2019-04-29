import { processSingleUpload, processBulkUpload } from '../../services/cloudinary';

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
            const { url } = await processSingleUpload(input.thumbnail, 'iamhrayr-portfolio/thumbnails/');
            const imagesResult = await processBulkUpload(input.images, 'iamhrayr-portfolio/works/');
            const imagesUrls = imagesResult.map((i: any) => i.url);

            return new models.Work({
                title: input.title,
                description: input.description,
                category: input.category,
                thumbnail: url,
                tags: input.tags,
                published: input.published,
                images: imagesUrls,
            }).save();
        },
        setWorkVisibility: async (parent: any, { id, published }: any, { models }: any) => {
            return models.Work.findOneAndUpdate({ _id: id }, { published }, { new: true });
        },

        deleteWork: async (parent: any, { id }: any, { models }: any) => {
            return models.Work.findByIdAndRemove(id);
        },

        // uploadFile: async (parent, { file }, { models }) => {
        //     // console.log('file', file);
        //     const { url } = await processSingleUpload(file, 'iamhrayr-portfolio/thumbnails/');
        //     console.log('@@thumbnail@@', url);
        //     // console.log('thumbnailUrl', thumbnailUrl);
        //     return url;
        // },

        // uploadFiles: async (parent, { files }, { models }) => {
        //     const results = await processBulkUpload(files, 'iamhrayr-portfolio/thumbnails/', [
        //         { width: 400, height: 400, crop: 'fill' },
        //     ]);
        //     const urls = results.map(i => i.url);
        //     console.log('@@urls@@', urls);
        //     return urls;
        // },
    },
};
