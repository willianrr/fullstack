import { LoginDTO } from '@models/users/users.schema';
import AuthService from '@services/auth.service';
import { RequestHandler } from 'express';

export const login: RequestHandler<{}, any, LoginDTO> = async (req, res) => {
  const { email, senha } = req.body;
  const token = await AuthService.login(email, senha);
  res.json({ token });
};
