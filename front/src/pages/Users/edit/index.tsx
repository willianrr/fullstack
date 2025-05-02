// src/pages/EditUser.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as z from 'zod';
import { get_user, update_user } from '../../../service/usersService';

const editUserSchema = z.object({
  nome: z.string().nonempty('Nome obrigatório'),
  email: z.string().email('Formato de email inválido'),
  telefone: z.string().min(10, 'Telefone inválido'),
  dataNascimento: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), 'Data de nascimento inválida'),
  senha: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
});
type EditUserForm = z.infer<typeof editUserSchema>;

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditUserForm>({
    resolver: zodResolver(editUserSchema),
  });

  useEffect(() => {
    if (!id) return;
    get_user(Number(id))
      .then((user) => {
        setValue('nome', user.nome);
        setValue('email', user.email);
        setValue('telefone', user.telefone);
        const dt = new Date(user.dataNascimento);
        const local = dt.toISOString().slice(0, 16);
        setValue('dataNascimento', local);
      })
      .catch((err: any) => {
        toast.error(err.message || 'Erro ao carregar usuário');
        navigate('/users');
      })
      .finally(() => setLoading(false));
  }, [id, setValue, navigate]);

  const onSubmit = async (data: EditUserForm) => {
    if (!id) return;
    try {
      await update_user(Number(id), data);
      toast.success('Usuário atualizado com sucesso.');
      navigate('/users');
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || 'Erro ao atualizar usuário');
    }
  };

  if (loading) {
    return <p className="p-4">Carregando usuário...</p>;
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Editar Usuário</h1>
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
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
            <p className="text-red-500 text-sm mt-1">{errors.telefone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="dataNascimento" className="block text-sm font-medium">
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
            <p className="text-red-500 text-sm mt-1">{errors.senha.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </form>
    </div>
  );
};


export default EditUser;