import { gql } from 'apollo-server';

const typeDefs = gql`
    type Skill {
        id: ID!
        name: String!
        percent: Int!
        color: String!
    }

    extend type Query {
        skills: [Skill!]!
    }

    extend type Mutation {
        addSkill(name: String!, percent: Int!, color: String!): Skill!
    }
`;

export default typeDefs;
