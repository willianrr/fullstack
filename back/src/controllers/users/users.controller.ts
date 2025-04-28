import { Request, Response } from 'express';
import { IUsers } from '../../models/users/users.schema';
import UserService from '../../services/users.service';
import { HttpError } from '../../utils/HttpError';

export const getAll = async (
  _req: Request<{}, any, any>,
  res: Response
): Promise<void> => {
  const users = await UserService.findAll();
  res.json(users);
};

export const getById = async (
  req: Request<{ id: string }, any, any>,
  res: Response
): Promise<void> => {
  const user = await UserService.findById(req.params.id);
  if (!user) throw new HttpError(404, 'Usuário não encontrado');
  res.json(user);
};

export const create = async (
  req: Request<{}, any, IUsers>,
  res: Response
): Promise<void> => {
  const created = await UserService.create(req.body);
  res.status(201).json(created);
};

export const update = async (
  req: Request<{ id: string }, any, Partial<IUsers>>,
  res: Response
): Promise<void> => {
  const updated = await UserService.update(req.params.id, req.body);
  if (!updated) throw new HttpError(404, 'Usuário não encontrado');
  res.json(updated);
};

export const remove = async (
  req: Request<{ id: string }, any, any>,
  res: Response
): Promise<void> => {
  const deleted = await UserService.remove(req.params.id);
  if (!deleted) throw new HttpError(404, 'Usuário não encontrado');
  res.status(204).send();
};
