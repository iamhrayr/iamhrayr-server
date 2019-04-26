import { processSingleUpload, processBulkUpload } from '../../services/cloudinary';

export default {
    Work: {
        category: (parent: any, args: any, { models }: any) => {
            return models.Category.findById(parent.category);
        },
    },
    Query: {
        works: (parent: any, args: any, { models }: any) => {
            return models.Work.find();
        },
    },
    Mutation: {
        addWork: async (parent: any, { thumbnail, images, ...rest }: any, { models }: any) => {
            const { url } = await processSingleUpload(thumbnail, 'iamhrayr-portfolio/thumbnails/');
            const imagesResult = await processBulkUpload(images, 'iamhrayr-portfolio/works/');
            const imagesUrls = imagesResult.map((i: any) => i.url);

            return new models.Work({
                title: rest.title,
                description: rest.description,
                category: rest.category,
                thumbnail: url,
                tags: rest.tags,
                images: imagesUrls,
            }).save();
        },
        setWorkVisibility: async (parent: any, { id, published }: any, { models }: any) => {
            return models.Work.findOneAndUpdate({ _id: id }, { published }, { new: true });
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
