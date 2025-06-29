import axios from 'axios';
import { GetGameListResponse } from '../types/response';
import { GetGameListRequest } from '../types/request';

const API_BASE_URL_MOCK = 'http://localhost:3001';
const API_BASE_URL_PROTO = 'http://localhost:3002';

const API_TESTBASE_URL = API_BASE_URL_MOCK;

export const fetchGameList = async (payload: GetGameListRequest): Promise<GetGameListResponse> => {
	const response = await axios.get<GetGameListResponse>(`${API_TESTBASE_URL}/api/games`, {
		params: payload,
	});
	console.log(`fetchGameList : ${response.data}`);
	return response.data;
};
