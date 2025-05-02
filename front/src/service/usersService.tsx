import { API_CLIENT } from '../utils/http-common';

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

export const users_list = async (): Promise<User[]> => {
	try {
		const response = await API_CLIENT.get('/users');
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const update_user = async (
	id: number,
	payload: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<User> => {
	try {
		const response = await API_CLIENT.put(`/users/${id}`, payload);
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const delete_user = async (id: number): Promise<void> => {
	try {
		await API_CLIENT.delete(`/users/${id}`);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const create_user = async (payload: {
	nome: string;
	email: string;
	telefone: string;
	dataNascimento: string;
	senha: string;
}): Promise<User> => {
	try {
		const response = await API_CLIENT.post('/users', payload);
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const get_user = async (id: number): Promise<User> => {
	try {
		const response = await API_CLIENT.get(`/users/${id}`);
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
};