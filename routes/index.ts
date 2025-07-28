import { Express } from 'express';
import userRoutes from './userRoutes';
import bookRoutes from './bookRoutes';
import authorRoutes from './authorRoutes';
import uploadRoutes from './uploadRoutes';
import { globalRateLimiter } from '../middleware/rateLimiter';

const routes = (app: Express) => {
  app.use('/api', globalRateLimiter);

  app.use('/api/user', userRoutes);
  app.use('/api/book', bookRoutes);
  app.use('/api/author', authorRoutes);
  app.use('/api/upload', uploadRoutes);
};

export default routes;
