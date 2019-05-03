import { Request, Response } from 'express';
import models from '../models';

export default {
    getSkills: async (req: Request, res: Response) => {
        try {
            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 10;

            const skills = await models.Skill.paginate({}, { page, limit });

            return res.send(skills);
        } catch (err) {
            return res.status(400).send(err);
        }
    },

    addSkill: async (req: Request, res: Response) => {
        try {
            const skill = await new models.Skill({
                name: req.body.name,
                percent: req.body.percent,
                color: req.body.color,
            }).save();

            return res.send(skill);
        } catch (err) {
            return res.status(400).send(err);
        }
    },

    editSkill: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const updatedSkill = await models.Skill.findByIdAndUpdate(id, { $set: req.body }, { new: true });

            return res.send(updatedSkill);
        } catch (err) {
            return res.status(400).send(err);
        }
    },

    deleteSkill: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const deletedSkill = await models.Skill.findByIdAndDelete(id);

            return res.send(deletedSkill);
        } catch (err) {
            return res.status(400).send(err);
        }
    },
};
