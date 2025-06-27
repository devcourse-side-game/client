import api from './axios';

export const searchMyDataApi = async () => {
	try {
		const response = await api.get('/users/me');
		return response.data;
	} catch (err) {
		console.log('사용자 정보 요청 실패', err);
		throw err;
	}
};
