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
        published: Boolean!
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
        setWorkVisibility(id: ID!, published: Boolean!): Work
        # unpublishWork(id: ID!): Work

        uploadFile(file: Upload): String
        uploadFiles(files: [Upload]): [String]
    }
`;

export default typeDefs;
