import { ApolloError } from 'apollo-server';

export default {
    Query: {
        skills: (parent: any, args: any, { models }: any) => {
            return models.Skill.find();
        },
    },
    Mutation: {
        addSkill: (parent: any, args: any, { models }: any) => {
            return new models.Skill({
                name: args.name,
                percent: args.percent,
                color: args.color,
            }).save();
        },
        editSkill: async (parent: any, { id, ...restArgs }: any, { models }: any) => {
            const skill = await models.Skill.findById(id);
            if (!skill) {
                throw new ApolloError('Skill with the provided id does not exist');
            }
            return models.Skill.findOneAndUpdate({ _id: id }, { ...restArgs }, { new: true });
        },
        deleteSkill: async (parent: any, { id }: any, { models }: any) => {
            const skill = await models.Skill.findById(id);
            if (!skill) {
                throw new ApolloError('Skill with the provided id does not exist');
            }
            return models.Skill.findOneAndDelete({ _id: id });
        },
    },
};
