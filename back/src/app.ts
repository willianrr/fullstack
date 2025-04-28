import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import users from './routes/users';

const app = express();

app.use(express.json());

app.use('/api/users', users);

app.use(errorMiddleware);

export default app;
