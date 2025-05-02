import { API_CLIENT } from "../utils/http-common";


export interface payloadProps {
	email: string;
	senha: string;
}

export const login = async (payload: payloadProps) => {
	try {
		const response = await API_CLIENT.post('/auth/login', payload);
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
}