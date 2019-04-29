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
        addWork(input: addWorkInput!): Work
        deleteWork(id: ID!): Work
        setWorkVisibility(id: ID!, published: Boolean!): Work

        uploadFile(file: Upload): String
        uploadFiles(files: [Upload]): [String]
    }

    input addWorkInput {
        title: String!
        description: String!
        thumbnail: Upload!
        images: [Upload!]!
        tags: [String!]!
        category: String!
        published: Boolean! = false
    }
`;

export default typeDefs;
