import express from 'express';
import controller from '../controllers/category';

const router = express.Router();

router.get('/', controller.getAllCategories);
router.post('/', controller.createCategory);
router.patch('/:id', controller.updateCategory);
router.delete('/:id', controller.deleteCategory);

export default router;
