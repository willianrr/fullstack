import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { delete_user, users_list } from '../../service/usersService';

export interface User {
	id: number;
	role: string;
	nome: string;
	email: string;
	telefone: string;
	dataNascimento: string;
	createdAt: string;
	updatedAt: string;
}

const UsersPage: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		users_list()
			.then(setUsers)
			.catch((err: any) => {
				const msg =
					err.response?.data?.message ||
					err.message ||
					'Erro ao buscar usuários';
				setError(msg);
			})
			.finally(() => setLoading(false));
	}, []);

	const handleEdit = (id: number) => {
		navigate(`/users/edit/${id}`);
	};

	const handleDelete = async (id: number) => {
		if (!window.confirm('Deseja realmente excluir este usuário?')) return;
		try {
			await delete_user(id);
			setUsers((prev) => prev.filter((u) => u.id !== id));
			toast.success('Usuário excluído com sucesso.');
		} catch (err: any) {
			const msg =
				err.response?.data?.message ||
				err.message ||
				'Erro ao excluir usuário';
			toast.error(msg);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Lista de Usuários</h1>

			{loading ? (
				<p>Carregando usuários...</p>
			) : error ? (
				<p className="text-red-500">{error}</p>
			) : (
				<div className="overflow-x-auto">
					<div className='flex gap-2 justify-end mb-4'>
						<button
							onClick={() => navigate('/users/create')}
							className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500 transition cursor-pointer"
						>
							Criar usuário
						</button>
					</div>
					<table className="min-w-full bg-white shadow-lg rounded-lg">
						<thead className="bg-gray-100">
							<tr>
								<th className="px-4 py-2 text-left">ID</th>
								<th className="px-4 py-2 text-left">Nome</th>
								<th className="px-4 py-2 text-left">Email</th>
								<th className="px-4 py-2 text-left">Ações</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user.id} className="hover:bg-gray-50">
									<td className="px-4 py-2">{user.id}</td>
									<td className="px-4 py-2">{user.nome}</td>
									<td className="px-4 py-2">{user.email}</td>
									<td className="px-4 py-2 flex gap-2">
										<button
											onClick={() => handleEdit(user.id)}
											className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
										>
											Editar
										</button>
										<button
											onClick={() => handleDelete(user.id)}
											className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
										>
											Excluir
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default UsersPage;
