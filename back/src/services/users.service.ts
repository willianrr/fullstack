
import { Users } from '@models/users/users.model';
import { HttpError } from '@utils/HttpError';

export default class UserService {

  static async findAll(): Promise<Users[]> {
    return Users.findAll();
  }

  static async findById(id: string): Promise<Users> {
    const user = await Users.findByPk(id);
    if (!user) {
      throw new HttpError(404, 'Usuário não encontrado');
    }
    return user;
  }

  static async create(data: {
    nome: string;
    email: string;
    telefone: string;
    dataNascimento: string;
    senha: string;
  }): Promise<Users> {
    return Users.create(data as any);
  }

  static async update(
    id: string,
    data: Partial<{
      nome: string;
      email: string;
      telefone: string;
      dataNascimento: string;
      senha: string;
    }>
  ): Promise<Users> {
    const user = await Users.findByPk(id);
    if (!user) {
      throw new HttpError(404, 'Usuário não encontrado');
    }
    return user.update(data);
  }

  static async remove(id: string): Promise<boolean> {
    const deleted = await Users.destroy({ where: { id } });
    return deleted > 0;
  }
}
