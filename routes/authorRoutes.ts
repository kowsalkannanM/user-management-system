import { Router } from 'express';
import {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor
} from '../controller/authorController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/create', authenticateToken, createAuthor);
router.get('/', authenticateToken, getAuthors);
router.get('/:id', authenticateToken, getAuthorById);
router.patch('/:id', authenticateToken, updateAuthor);
router.delete('/:id', authenticateToken, deleteAuthor);

export default router;
