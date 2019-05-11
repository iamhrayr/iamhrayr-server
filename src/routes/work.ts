import express from 'express';
import controller from '../controllers/work';

const router = express.Router();

router.get('/', controller.getWorks);
router.get('/:id', controller.getWork);
router.post('/', controller.addWorkImages, controller.addWork);
router.patch('/:id', controller.addWorkImages, controller.editWork);
router.delete('/:id', controller.deleteWork);

export default router;
