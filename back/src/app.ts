import dotenv from 'dotenv';
import express from 'express';
import 'tsconfig-paths/register';
import { errorHandler } from './middlewares/error.middleware';
dotenv.config();

import authRoutes from './routes/auth.route';
import userRoutes from './routes/users.route';

export const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/auth', authRoutes);  

app.use(errorHandler);
