import axios from 'axios';

const api = axios.create({
	baseURL: 'http://127.0.0.1:3000/api', // 주소
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true, // 쿠키 사용 시 필요
});

api.interceptors.request.use((config) => {
	// 로그인 관련 API는 토큰 없이 요청
	const noAuthPaths = ['/login', '/signup'];
	const isPublic = noAuthPaths.some((path) => config.url?.includes(path));

	if (!isPublic) {
		const token = localStorage.getItem('accessToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	}

	return config;
});

export default api;
