import typeDefs from './typeDefs';
import resolvers from './resolvers';

const Query = `
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
`;

export default {
    typeDefs: [Query, ...typeDefs],
    resolvers,
};
