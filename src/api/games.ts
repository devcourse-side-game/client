import axios from 'axios';
import { TGetGameListResponse } from '../types/response';
import { GetGameListRequest } from '../types/request';

const API_BASE_URL_MOCK = 'http://localhost:3001';
const API_BASE_URL_PROTO = 'http://localhost:3002';

const API_TESTBASE_URL = API_BASE_URL_PROTO;
const TEST_TOKEN =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInVzZXJuYW1lIjoic29yaTEyMyIsImVtYWlsIjoidGVzdHNvcmkxMjNAZ21haWwuY29tIiwiaWF0IjoxNzUxMzUyMTI4LCJleHAiOjE3NTEzNjI5MjgsImF1ZCI6InRlc3Rzb3JpMTIzQGdtYWlsLmNvbSIsImlzcyI6ImdhbWUtcGFydHkifQ.QCym55F5rlhJmhz9ail4_EWqcFnRcvDkc4587rDVaGA';

export const fetchGameList = async (payload: GetGameListRequest): Promise<TGetGameListResponse> => {
	const queryParams = new URLSearchParams();
	// isActive, page,limit
	if (payload.isactive) {
		queryParams.append('isactive', payload.isactive.toString());
	}
	if (payload.platform) {
		queryParams.append('platform', payload.platform);
	}
	if (payload.search) {
		queryParams.append('search', payload.search);
	}
	queryParams.append('page', payload.page.toString());
	queryParams.append('limit', payload.limit.toString());

	const response = await axios.get<TGetGameListResponse>(
		`${API_TESTBASE_URL}/api/games?${queryParams.toString()}`,
		{
			headers: {
				Authorization: `Bearer ${TEST_TOKEN}`,
			},
		}
	);
	return response.data;
};
