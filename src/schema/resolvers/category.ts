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
        editCategory: async (parent: any, args: any, { models }: any) => {
            const category = await models.Category.findById(args.id);
            if (!category) {
                throw new ApolloError('Category with the given id was not found');
            }
            return models.Category.findOneAndUpdate({ _id: args.id }, { ...args }, { new: true });
        },
        deleteCategory: async (parent: any, args: any, { models }: any) => {
            const category = await models.Category.findById(args.id);
            if (!category) {
                throw new ApolloError('Category with the given id was not found');
            }
            return models.Category.findOneAndDelete({ _id: args.id });
        },
    },
};
