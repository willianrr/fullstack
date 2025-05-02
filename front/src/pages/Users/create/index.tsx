// src/pages/CreateUser.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as z from 'zod';
import { create_user } from '../../../service/usersService';

const createUserSchema = z.object({
  nome: z.string().nonempty('Nome obrigatório'),
  email: z.string().email('Formato de email inválido'),
  telefone: z.string().min(10, 'Telefone inválido'),
  dataNascimento: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), 'Data de nascimento inválida'),
  senha: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
});

type CreateUserForm = z.infer<typeof createUserSchema>;

const CreateUser: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { dataNascimento: '' },
  });

  const onSubmit = async (data: CreateUserForm) => {
    try {
      await create_user(data);
      toast.success('Usuário criado com sucesso.');
      navigate('/users');
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || err.message || 'Erro ao criar usuário'
      );
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Criar Usuário</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 shadow rounded"
      >
   
        <div>
          <label htmlFor="nome" className="block text-sm font-medium">
            Nome
          </label>
          <input
            id="nome"
            {...register('nome')}
            className={`mt-1 w-full border ${
              errors.nome ? 'border-red-500' : 'border-gray-300'
            } rounded px-3 py-2`}
          />
          {errors.nome && (
            <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>
          )}
        </div>

 
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`mt-1 w-full border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded px-3 py-2`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

      
        <div>
          <label htmlFor="telefone" className="block text-sm font-medium">
            Telefone
          </label>
          <input
            id="telefone"
            type="tel"
            {...register('telefone')}
            className={`mt-1 w-full border ${
              errors.telefone ? 'border-red-500' : 'border-gray-300'
            } rounded px-3 py-2`}
          />
          {errors.telefone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.telefone.message}
            </p>
          )}
        </div>

   
        <div>
          <label
            htmlFor="dataNascimento"
            className="block text-sm font-medium"
          >
            Data de Nascimento
          </label>
          <input
            id="dataNascimento"
            type="datetime-local"
            {...register('dataNascimento')}
            className={`mt-1 w-full border ${
              errors.dataNascimento ? 'border-red-500' : 'border-gray-300'
            } rounded px-3 py-2`}
          />
          {errors.dataNascimento && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dataNascimento.message}
            </p>
          )}
        </div>

 
        <div>
          <label htmlFor="senha" className="block text-sm font-medium">
            Senha
          </label>
          <input
            id="senha"
            type="password"
            {...register('senha')}
            className={`mt-1 w-full border ${
              errors.senha ? 'border-red-500' : 'border-gray-300'
            } rounded px-3 py-2`}
          />
          {errors.senha && (
            <p className="text-red-500 text-sm mt-1">
              {errors.senha.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Criando...' : 'Criar Usuário'}
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
