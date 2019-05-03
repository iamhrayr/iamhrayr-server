import express from 'express';
import controller from '../controllers/category';

const router = express.Router();

router.get('/', controller.getCategories);
router.post('/', controller.addCategory);
router.patch('/:id', controller.editCategory);
router.delete('/:id', controller.deleteCategory);

export default router;
