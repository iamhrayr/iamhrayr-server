import express from 'express';
import controller from '../controllers/skill';

const router = express.Router();

router.get('/', controller.getAllSkill);
router.post('/', controller.createSkill);
router.patch('/:id', controller.updateSkill);
router.delete('/:id', controller.deleteSkill);

export default router;
