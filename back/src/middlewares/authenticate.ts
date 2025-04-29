import AuthService from '@services/auth.service';
import { HttpError } from '@utils/HttpError';
import { NextFunction, Request, Response } from 'express';

export interface AuthRequest extends Request {
  user?: { sub: number; email: string; role: 'user' | 'admin' };
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    throw new HttpError(401, 'Token ausente');
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    throw new HttpError(401, 'Formato de token inválido');
  }

  const payload = AuthService.verifyToken(token);
  req.user = payload;
  next();
}
