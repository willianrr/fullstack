import express from 'express';
import { errorHandler } from './middlewares/error.middleware';
import userRoutes from './routes/users.route';

export const app = express();

app.use(express.json());
app.use('/users', userRoutes);

app.use(errorHandler);
