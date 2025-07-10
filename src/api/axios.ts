import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { loginSuccess, logout } from '../stores/authSlice';
import { refreshTokenApi } from './auth';
import { store } from '../stores';

const api = axios.create({
	baseURL: 'https://nas.stann.kr:4545/api', // 주소
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true, // 쿠키 사용 시 필요
});

const noAuthPaths = ['/auth/login', '/auth/register'];

api.interceptors.request.use((config) => {
	// 로그인 관련 API는 토큰 없이 요청
	const isPublic = noAuthPaths.some((path) => config.url?.includes(path));
	if (!isPublic) {
		const token = localStorage.getItem('accessToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	}
	return config;
});

let isRefreshing = false;
// 토큰 재발급이 완료될 때까지 대기해야 하는 요청들을 저장할 큐
let failedQueue: Array<{
	resolve: (value?: any) => void;
	reject: (reason?: any) => void;
}> = [];

/**
 * 큐에 있는 요청들을 처리하는 함수
 * @param token 새로 발급받은 accessToken
 */
const processQueue = (token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (token) {
			prom.resolve(token);
		} else {
			prom.reject('Refresh token failed');
		}
	});
	failedQueue = [];
};

// 최대 재시도 횟수
const MAX_RETRY_COUNT = 3;
// 응답 인터셉터: accessToken 만료 시
api.interceptors.response.use(
	(res) => res,
	async (err: AxiosError) => {
		const originalRequest = err.config as InternalAxiosRequestConfig & {
			_retry?: boolean;
			_retryCount?: number;
		};

		const pathname = new URL(
			originalRequest.url!,
			originalRequest.baseURL || api.defaults.baseURL!
		).pathname;

		if (noAuthPaths.includes(pathname)) {
			return Promise.reject(err);
		}

		// 401 에러가 아니거나, 이미 재시도된 요청인 경우 (무한 루프 방지)
		if (err.response?.status !== 401) {
			return Promise.reject(err);
		}

		originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
		originalRequest._retry = true; // 재시도 플래그 설정

		if (originalRequest._retryCount >= MAX_RETRY_COUNT) {
			console.warn('❌ 최대 재시도 횟수 초과, 로그아웃 처리');
			store.dispatch(logout());
			return Promise.reject(err);
		}

		// 토큰 재발급이 진행 중인 경우, 현재 요청을 큐에 추가하고 대기
		if (isRefreshing) {
			return new Promise((resolve, reject) => {
				failedQueue.push({ resolve, reject });
			})
				.then((token) => {
					originalRequest.headers.Authorization = `Bearer ${token}`;
					return api(originalRequest);
				})
				.catch((refreshError) => {
					return Promise.reject(refreshError);
				});
		}

		// 토큰 재발급 시작
		isRefreshing = true;

		try {
			const response = await refreshTokenApi(); // 리프레시 토큰 API 호출
			const newAccessToken = response.accessToken;

			store.dispatch(loginSuccess(newAccessToken));
			api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

			// 큐에 있는 모든 요청들을 새로운 토큰으로 재시도
			processQueue(newAccessToken);

			originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
			return api(originalRequest);
		} catch (refreshError) {
			console.error('❗️refreshToken 재발급 실패', refreshError);
			processQueue(null);
			store.dispatch(logout());
			return Promise.reject(refreshError);
		} finally {
			isRefreshing = false; // 재발급 완료 (성공/실패 무관)
			console.log('[DEBUG] isRefreshing 상태 false로 변경');
		}
	}
);
export default api;
