import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest = (schema: AnyZodObject): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: 'Erro de validação.',
        errors: result.error.format(),
      });
      return;
    }

    req.body = result.data;
    next(); 
  };
};
