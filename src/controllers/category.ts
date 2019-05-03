import { Request, Response } from 'express';
import models from '../models';

export default {
    getCategories: async (req: Request, res: Response) => {
        try {
            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 10;

            const categories = await models.Category.paginate({}, { page, limit });

            return res.send(categories);
        } catch (err) {
            return res.status(400).send(err);
        }
    },

    addCategory: async (req: Request, res: Response) => {
        try {
            const category = await new models.Category({
                name: req.body.name,
            }).save();

            return res.send(category);
        } catch (err) {
            return res.status(400).send(err);
        }
    },

    editCategory: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const updatedCategory = await models.Category.findByIdAndUpdate(id, { name }, { new: true });

            return res.send(updatedCategory);
        } catch (err) {
            return res.status(400).send(err);
        }
    },

    deleteCategory: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const deletedCategory = await models.Category.findByIdAndDelete(id);

            return res.send(deletedCategory);
        } catch (err) {
            return res.status(400).send(err);
        }
    },
};
