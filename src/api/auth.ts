import api from './axios';
import { LoginRequest } from '../types/request';
import { LoginResponse } from '../types/response';

export const loginApi = async (payload: LoginRequest): Promise<LoginResponse> => {
	const response = await api.post<LoginResponse>('/auth/login', payload);
	return response.data;
};
