import { Users } from '@models/users/users.model';
import { HttpError } from '@utils/HttpError';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = '1h';

export default class AuthService {

  static async login(email: string, senha: string): Promise<string> {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      throw new HttpError(401, 'Credenciais inválidas');
    }

    const valid = await user.validPassword(senha);
    if (!valid) {
      throw new HttpError(401, 'Credenciais inválidas');
    }

    const payload = { sub: user.id, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return token;
  }

  static verifyToken(token: string): { sub: number; email: string } {
    try {
      return jwt.verify(token, JWT_SECRET) as unknown as { sub: number; email: string };
    } catch {
      throw new HttpError(401, 'Token inválido');
    }
  }
}
