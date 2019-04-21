import { gql } from 'apollo-server';

const typeDefs = gql`
    type Work {
        id: ID!
        title: String!
        description: String!
        thumbnail: String!
        tags: [String!]!
        category: Category!
        images: [String]!
        createdAt: Date!
        updatedAt: Date!
    }

    extend type Query {
        works: [Work]
        work(id: ID!): Work
    }

    extend type Mutation {
        addWork(
            title: String!
            description: String!
            thumbnail: Upload!
            tags: [String!]!
            category: String! # images: [String]!
        ): Work

        uploadFile(file: Upload): String
        uploadFiles(files: [Upload]): [String]
    }
`;

export default typeDefs;
