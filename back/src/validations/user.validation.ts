import { z } from 'zod';

export const createUserSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório.'),
  email: z.string().email('Email inválido.'),
  telefone: z.string().min(8, 'Telefone inválido.'),
  dataNascimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de data inválido. Use YYYY-MM-DD.'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres.')
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido.'),
  senha: z.string().min(1, 'Senha é obrigatória.')
});
