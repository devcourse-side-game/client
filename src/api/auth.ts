import api from './axios';
import { LoginRequest, NicknameCheckRequest, SignupRequest } from '../types/request';
import { LoginResponse, Response } from '../types/response';

export const loginApi = async (payload: LoginRequest): Promise<LoginResponse> => {
	const response = await api.post<LoginResponse>('/auth/login', payload);
	return response.data;
};

export const signupApi = async (payload: SignupRequest): Promise<Response> => {
	const response = await api.post<Response>('/auth/register', payload);
	return response.data;
};

export const nicknameCheckApi = async (payload: NicknameCheckRequest): Promise<Response> => {
	const response = await api.get<Response>(`/auth/nicknameCheck?nickname=${payload.username}`);
	return response.data;
};

export const logoutApi = async (): Promise<Response> => {
	const response = await api.post<Response>('/auth/logout');
	return response.data;
};
