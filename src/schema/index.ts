import typeDefs from './typeDefs';
import resolvers from './resolvers';

const RootType = `
    scalar Date
    scalar UploadOrUrlObject
    scalar Any

    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
`;

export default {
    typeDefs: [RootType, ...typeDefs],
    resolvers,
};
