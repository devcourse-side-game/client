import api from './axios';

/** 기능 : 내 정보 조회 */
export const searchMyDataApi = async () => {
	const response = await api.get('/users/me');
	return response.data;
};
