import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import 'tsconfig-paths/register';
import { errorHandler } from './middlewares/error.middleware';
dotenv.config();

import adminRoutes from './routes/admin.route';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/users.route';

export const app = express();
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true,          
}));

app.use(express.json());
app.use('/users', userRoutes);
app.use('/auth', authRoutes);  
app.use('/admin', adminRoutes);

app.use(errorHandler);
