import { IUserDataResponse } from '../types/response';
import api from './axios';

export const searchMyDataApi = async (): Promise<IUserDataResponse> => {
	const response = await api.get<IUserDataResponse>('/users/me');
	console.log(response);
	return response.data;
};
