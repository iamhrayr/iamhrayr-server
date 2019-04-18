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
    },
};
