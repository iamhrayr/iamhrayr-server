import express from 'express';
import controller, { upload } from '../controllers/work';

const router = express.Router();
const uploadMiddleware = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images' }]);

router.get('/', controller.getAllWork);
router.get('/:id', controller.getOneWork);
router.post('/', uploadMiddleware, controller.createWork);
router.patch('/:id', uploadMiddleware, controller.updateWork);
router.delete('/:id', controller.deleteWork);

export default router;
