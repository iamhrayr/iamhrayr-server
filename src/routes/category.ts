import express from 'express';
import { check, validationResult } from 'express-validator/check';

import models from '../models';

const router = express.Router();

router.get('/', (req, res) => {
    models.Category.find();
});

router.post('/', [
    check('name').not().isEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    return new models.Category({
        name: req.name,
    }).save();
});

export default router;