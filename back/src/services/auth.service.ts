import { Users } from '@models/users/users.model';
import { HttpError } from '@utils/HttpError';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = '1h';
export interface TokenPayload {
  sub: number;
  email: string;
  role: 'user' | 'admin';
}

const tokenPayloadSchema = z.object({
  sub: z.number(),
  email: z.string().email(),
  role: z.enum(['user', 'admin']),
});

export default class AuthService {

  static async login(email: string, senha: string): Promise<string> {
    const user = await Users.findOne({ where: { email } });
    if (!user || !(await user.validPassword(senha))) {
      throw new HttpError(401, 'Credenciais inválidas');
    }

    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  static verifyToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return tokenPayloadSchema.parse(decoded);
    } catch (err) {
      throw new HttpError(401, 'Token inválido');
    }
  }
}
