import { IUserDataResponse } from '../types/response';
import api from './axios';

export const searchMyDataApi = async (): Promise<IUserDataResponse> => {
	const response = await api.get<IUserDataResponse>('/users/me');
	console.log(response);
	return response.data;
};

export const deleteUserAip = async (): Promise<Response> => {
	const response = await api.delete<Response>('/users/me');
	return response.data;
};

export const updateMyDataApi = async (): Promise<Response> => {
	const response = await api.put<Response>('/users/me');
	return response.data;
};

export const updatePasswordApi = async (): Promise<Response> => {
	const response = await api.put<Response>('/users/me/password');
	return response.data;
};
