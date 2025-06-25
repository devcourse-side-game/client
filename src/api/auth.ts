import api from './axios';
import { LoginRequest, NicknameCheckRequest, SignupRequest } from '../types/request';
import { LoginResponse } from '../types/response';

export const loginApi = async (payload: LoginRequest): Promise<LoginResponse> => {
	const response = await api.post<LoginResponse>('/auth/login', payload);
	return response.data;
};

export const signupApi = async (payload: SignupRequest): Promise<Response> => {
	const response = await api.post<Response>('/auth/register', payload);
	return response.data;
};

export const nicknameCheckApi = async (payload: NicknameCheckRequest): Promise<Response> => {
	const response = await api.post<Response>('/auth/register', payload);
	return response.data;
};

export const logoutApi = async () => {
	// TODO :: 로그아웃 로직은 프론트에서 제어
	return '';
};
