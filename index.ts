import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import sequelize from './database/sequelize';
import routes from './routes/index';
import { globalRateLimiter } from './middleware/rateLimiter';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(globalRateLimiter);
app.use(express.json());
routes(app);

// Database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL via Sequelize');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

export default app;
