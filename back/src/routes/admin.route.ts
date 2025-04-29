import { authenticate } from '@middlewares/authenticate';
import { authorizeAdmin } from '@middlewares/authorize';
import { IUsers } from '@models/users/users.schema';
import UserService from '@services/users.service';
import { validateUserBody } from '@validations/validateUserBody';
import { Request, Response, Router } from 'express';

const router = Router();

router.post(
  '/users',
  authenticate,
  authorizeAdmin,
  validateUserBody,
  async (req: Request<{}, any, IUsers>, res: Response) => {
    const { nome, email, telefone, dataNascimento, senha } = req.body;
    const adminUser = await UserService.create({
      nome,
      email,
      telefone,
      dataNascimento,
      senha,
      role: 'admin',
    });
    res.status(201).json(adminUser);
  }
);

export default router;
