import { gql } from 'apollo-server';

const typeDefs = gql`
    type Work {
        id: ID!
        title: String!
        description: String!
        thumbnail: Image!
        tags: [String!]!
        category: Category!
        images: [Image]!
        published: Boolean!
        createdAt: Date!
        updatedAt: Date!
    }

    type Image {
        url: String!
        key: String!
    }

    extend type Query {
        works: [Work]
        work(id: ID!): Work
    }

    extend type Mutation {
        addWork(input: addWorkInput!): Work
        editWork(id: ID!, input: addWorkInput!): Work
        deleteWork(id: ID!): Work
        setWorkVisibility(id: ID!, published: Boolean!): Work
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
