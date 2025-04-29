
import { IUsers, UsersSchemaValidate } from '@models/users/users.schema';
import { RequestHandler } from 'express';

export const validateUserBody: RequestHandler<{}, any, Partial<IUsers>> =
  (req, res, next): void => {
    const { error, value } = UsersSchemaValidate.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((d) => ({
        field: d.path.join('.'),
        message: d.message,
      }));
      res.status(400).json({ errors: details });
      return; 
    }

    req.body = value;
    next();
  };
