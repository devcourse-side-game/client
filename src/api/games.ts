import api from './axios';
import {
	TGameDetailResponse,
	TGetGameListResponse,
	TGetUserGameProfilesResponse,
} from '../types/response';
import { GetGameListRequest } from '../types/request';
import { TGetUserGameProfilesQuery } from '../types/party';

/** 기능 : 게임 목록 조회 */
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

	const response = await api.get<TGetGameListResponse>(`/games?${queryParams.toString()}`);
	return response.data;
};

/** 기능 : 게임 상세 조회 */
export const fetchGameDetail = async (gameId: number): Promise<TGameDetailResponse> => {
	const response = await api.get<TGameDetailResponse>(`/games/${gameId}`);
	return response.data;
};

/** 기능 : 유저 게임 프로필 조회 */
export const fetchUserGameProfiles = async (
	payload: TGetUserGameProfilesQuery
): Promise<TGetUserGameProfilesResponse> => {
	const { userId, gameId } = payload;
	const response = await api.get<TGetUserGameProfilesResponse>(
		`/users/${userId}/game-profiles/${gameId}`
	);
	return response.data;
};
