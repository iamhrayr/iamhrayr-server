import { gql } from 'apollo-server';

const typeDefs = gql`
    type Skill {
        id: ID!
        name: String!
        percent: Int!
        color: String!
        createdAt: Date!
        updatedAt: Date!
    }

    extend type Query {
        skills: [Skill!]!
    }

    extend type Mutation {
        addSkill(name: String!, percent: Int!, color: String!): Skill!
        editSkill(id: ID!, name: String, percent: Int, color: String): Skill!
        deleteSkill(id: ID!): Skill!
    }
`;

export default typeDefs;
