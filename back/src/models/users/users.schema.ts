import Joi from 'joi';

export const UsersSchemaValidate = Joi.object({
  nome: Joi.string()
    .min(1)
    .required()
    .messages({
      'string.empty': 'Nome é obrigatório.',
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Email inválido.',
      'string.empty': 'Email é obrigatório.',
    }),

  telefone: Joi.string()
    .pattern(/^\+?\d{8,15}$/)
    .required()
    .messages({
      'string.pattern.base': 'Telefone inválido. Apenas dígitos, opcional “+”, entre 8 e 15 caracteres.',
      'string.empty': 'Telefone é obrigatório.',
    }),

  dataNascimento: Joi.date()
    .iso()
    .required()
    .messages({
      'date.format': 'Data inválida. Use formato ISO (YYYY-MM-DD).',
      'date.base': 'Data de nascimento inválida.',
      'any.required': 'Data de nascimento é obrigatória.',
    }),

  senha: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Senha deve ter pelo menos 6 caracteres.',
      'string.empty': 'Senha é obrigatória.',
    }),
});

export const LoginSchemaValidate = Joi.object({
	email: Joi.string()
	  .email({ tlds: { allow: false } })
	  .required()
	  .messages({
		'string.email': 'Email inválido.',
		'string.empty': 'Email é obrigatório.',
	  }),
  
	senha: Joi.string()
	  .min(6)
	  .required()
	  .messages({
		'string.min': 'Senha deve ter pelo menos 6 caracteres.',
		'string.empty': 'Senha é obrigatória.',
	  }),
  });

export interface IUsers {
	nome: string;
	email: string;
	telefone: string;
	dataNascimento: string;
	senha: string;
	role: 'user' | 'admin';
}

export type LoginDTO = Pick<IUsers, 'email' | 'senha'>;