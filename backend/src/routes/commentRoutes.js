import express from 'express';
import { getComments, createComment, deleteComment } from '../controllers/commentController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router({ mergeParams: true });

router.get('/', getComments);
router.post('/', authMiddleware, createComment);
router.delete('/:id', authMiddleware, deleteComment);

export default router;
