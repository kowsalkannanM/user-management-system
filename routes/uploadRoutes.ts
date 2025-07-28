import { Router } from 'express';
import upload from '../middleware/uploadMiddleware';
import {
  uploadImage
} from '../controller/uploadController';

const router = Router();

router.post('/image', upload.single('image'), uploadImage);

export default router;
