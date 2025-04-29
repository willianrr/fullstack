import { HttpError } from '@utils/HttpError';
import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (
  err,   
  _req,
  res,
  _next
): void => { 
  if (err instanceof HttpError) {
    res.status(err.status).json({ message: err.message });
  } else {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
