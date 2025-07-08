import { useQuery } from '@tanstack/react-query';
import {
	TGameDetailResponse,
	TGetGameListResponse,
	TGetUserGameProfilesResponse,
} from '../types/response';
import { GetGameListRequest } from '../types/request';
import { fetchGameDetail, fetchGameList, fetchUserGameProfiles } from '../api/games';
import { TGetUserGameProfilesQuery } from '../types/party';

export const useGameList = (payload: GetGameListRequest) => {
	payload = {
		...payload,
		isactive: true,
	};
	return useQuery<
		TGetGameListResponse,
		Error,
		TGetGameListResponse,
		['games', GetGameListRequest]
	>({
		queryKey: ['games', payload],
		queryFn: async () => {
			const response = await fetchGameList(payload);

			return response;
		},
	});
};

export const useGameDetail = (gameId: number, enabled: boolean) => {
	return useQuery<TGameDetailResponse, Error, TGameDetailResponse, ['games', number]>({
		queryKey: ['games', gameId],
		queryFn: async () => {
			const response = await fetchGameDetail(gameId);
			return response;
		},
		enabled: enabled,
	});
};

export const useUserGameProfiles = (payload: TGetUserGameProfilesQuery) => {
	if (payload.userId === undefined) {
		throw new Error('userId is required');
	}
	const isEnabled = !!payload.userId && !!payload.gameId;
	return useQuery<
		TGetUserGameProfilesResponse,
		Error,
		TGetUserGameProfilesResponse,
		['userGameProfiles', TGetUserGameProfilesQuery]
	>({
		queryKey: ['userGameProfiles', payload],
		queryFn: async () => {
			const response = await fetchUserGameProfiles(payload);
			return response;
		},
		enabled: isEnabled,
	});
};
