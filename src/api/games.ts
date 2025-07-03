import axios from 'axios';
import {
	TGameDetailResponse,
	TGetGameListResponse,
	TGetUserGameProfilesResponse,
} from '../types/response';
import { GetGameListRequest } from '../types/request';
import { TGetUserGameProfilesQuery } from '../types/Party';

const API_BASE_URL_PROTO = 'http://localhost:3002';

const API_TESTBASE_URL = API_BASE_URL_PROTO;
const TEST_TOKEN =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInVzZXJuYW1lIjoic29yaTEyMyIsImVtYWlsIjoidGVzdHNvcmkxMjNAZ21haWwuY29tIiwiaWF0IjoxNzUxNTEyNzk3LCJleHAiOjE3NTE1MjM1OTcsImF1ZCI6InRlc3Rzb3JpMTIzQGdtYWlsLmNvbSIsImlzcyI6ImdhbWUtcGFydHkifQ.M15K13doS-5UzvjeDPZxtKRyqAdZcfkyZT4UbnC2CLU';

export const fetchGameList = async (payload: GetGameListRequest): Promise<TGetGameListResponse> => {
	const queryParams = new URLSearchParams();
	// isActive, page,limit
	if (payload.isactive) {
		queryParams.append('isActive', payload.isactive.toString());
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

export const fetchGameDetail = async (payload: number): Promise<TGameDetailResponse> => {
	const response = await axios.get<TGameDetailResponse>(
		`${API_TESTBASE_URL}/api/games/${payload}`,
		{
			headers: {
				Authorization: `Bearer ${TEST_TOKEN}`,
			},
		}
	);
	return response.data;
};

export const fetchUserGameProfiles = async (
	payload: TGetUserGameProfilesQuery
): Promise<TGetUserGameProfilesResponse> => {
	const { userId, gameId } = payload;
	const response = await axios.get<TGetUserGameProfilesResponse>(
		`${API_TESTBASE_URL}/api/users/${userId}/game-profiles/${gameId}`,
		{
			headers: {
				Authorization: `Bearer ${TEST_TOKEN}`,
			},
		}
	);
	return response.data;
};
