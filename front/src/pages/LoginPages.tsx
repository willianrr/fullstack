import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const loginSchema = z.object({
  email: z.string().email('Formato de email inválido'),
  password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPages: React.FC = () => {
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError('');
    try {
      console.log('Login enviado:', data);
    } catch (err: any) {
      setServerError(err.message || 'Erro ao autenticar.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-3xl font-semibold text-center mb-6">Entrar</h1>

        {serverError && (
          <div className="mb-4 text-red-600 text-center" role="alert">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 
                ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 
                ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition"
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPages;
