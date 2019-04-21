import { ApolloError } from 'apollo-server';

export default {
    Query: {
        categories: (parent: any, args: any, { models }: any) => {
            return models.Category.find();
        },
    },
    Mutation: {
        addCategory: (parent: any, args: any, { models }: any) => {
            return new models.Category({
                name: args.name,
            }).save();
        },
        editCategory: async (parent: any, { id, ...restArgs }: any, { models }: any) => {
            const category = await models.Category.findById(id);
            if (!category) {
                throw new ApolloError('Category with the given id was not found');
            }
            return models.Category.findOneAndUpdate({ _id: id }, { ...restArgs }, { new: true });
        },
        deleteCategory: async (parent: any, { id }: any, { models }: any) => {
            const category = await models.Category.findById(id);
            if (!category) {
                throw new ApolloError('Category with the given id was not found');
            }
            return models.Category.findOneAndDelete({ _id: id });
        },
    },
};
