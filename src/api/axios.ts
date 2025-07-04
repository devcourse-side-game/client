import axios from 'axios';
import { loginSuccess, logout } from '../stores/authSlice';
import { refreshTokenApi } from './auth';
import { store } from '../stores';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
	baseURL: 'http://127.0.0.1:3000/api', // 주소
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true, // 쿠키 사용 시 필요
});

api.interceptors.request.use((config) => {
	// 로그인 관련 API는 토큰 없이 요청
	const noAuthPaths = ['/login', '/regiter'];
	const isPublic = noAuthPaths.some((path) => config.url?.includes(path));
	if (!isPublic) {
		const token = localStorage.getItem('accessToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	}
	return config;
});

// 응답 인터셉터: accessToken 만료 시
api.interceptors.response.use(
	(res) => res,
	async (err) => {
		console.log(err.response?.status);
		if (err.response?.status === 401 && !err.config._retry) {
			err.config._retry = true;

			try {
				const response = await refreshTokenApi();
				const newAccessToken = response.accessToken;

				store.dispatch(loginSuccess(newAccessToken));
				err.config.headers.Authorization = `Bearer ${newAccessToken}`;
				return api(err.config); // 요청 재시도
			} catch (e) {
				// const navigate = useNavigate();
				store.dispatch(logout());
				// navigate('/login');
				return Promise.reject(e);
			}
		}
		return Promise.reject(err);
	}
);

export default api;
