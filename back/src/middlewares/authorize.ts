import { RequestHandler } from 'express';
import { AuthRequest } from './authenticate';

export const authorizeAdmin: RequestHandler = (
  req,
  res,
  next
): void => {
  const { user } = req as AuthRequest;
  if (user?.role !== 'admin') {
    res.status(403).json({ message: 'Acesso negado: admin apenas.' });
    return;
  }
  next();
};