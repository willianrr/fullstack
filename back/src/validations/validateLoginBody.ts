import { LoginDTO, LoginSchemaValidate } from '@models/users/users.schema';
import { RequestHandler } from 'express';

export const validateLoginBody: RequestHandler<{}, any, LoginDTO> = (
  req,
  res,
  next
) => {
  const { error, value } = LoginSchemaValidate.validate(req.body, {
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

  req.body = value as LoginDTO;
  next();
};
