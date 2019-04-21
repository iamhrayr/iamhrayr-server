import { gql } from 'apollo-server';

const typeDefs = gql`
    type Category {
        id: ID!
        name: String!
    }

    extend type Query {
        categories: [Category!]!
    }

    extend type Mutation {
        addCategory(name: String!): Category!
        editCategory(id: ID!, name: String!): Category!
    }
`;

export default typeDefs;
