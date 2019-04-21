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
    },
};
