import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:3000', // 주소
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true, // 쿠키 사용 시 필요
});

export default api;
