import { Router } from 'express';
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
} from '../controller/bookController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticateToken, createBook);
router.get('/', authenticateToken, getBooks);
router.get('/:id', authenticateToken, getBookById);
router.patch('/:id', authenticateToken, updateBook);
router.delete('/:id', authenticateToken, deleteBook);

export default router;
