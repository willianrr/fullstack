import { IUsers } from '@models/users/users.schema';
import UserService from '@services/users.service';
import { HttpError } from '@utils/HttpError';
import { RequestHandler } from 'express';

export const getAll: RequestHandler = async (_req, res) => {
  const users = await UserService.findAll();
  res.json(users);
};

export const getById: RequestHandler = async (req, res) => {
  const user = await UserService.findById(req.params.id);
  res.json(user);
};

export const create: RequestHandler = async (req, res) => {
  const newUser = req.body as IUsers;
  const created = await UserService.create(newUser);
  res.status(201).json(created);
};

export const update: RequestHandler = async (req, res) => {
  const updates = req.body as Partial<IUsers>;
  const updated = await UserService.update(req.params.id, updates);
  res.json(updated);
};

export const remove: RequestHandler = async (req, res) => {
  const deleted = await UserService.remove(req.params.id);
  if (!deleted) throw new HttpError(404, 'Usuário não encontrado');
  res.status(204).send();
};
