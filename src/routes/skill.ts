import express from 'express';
import controller from '../controllers/skill';

const router = express.Router();

router.get('/', controller.getSkills);
router.post('/', controller.addSkill);
router.patch('/:id', controller.editSkill);
router.delete('/:id', controller.deleteSkill);

export default router;
