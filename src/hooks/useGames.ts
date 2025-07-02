import { useQuery } from '@tanstack/react-query';
import {
	TGameDetailResponse,
	TGetGameListResponse,
	TGetUserGameProfilesResponse,
} from '../types/response';
import { GetGameListRequest } from '../types/request';
import { fetchGameDetail, fetchGameList, fetchUserGameProfiles } from '../api/games';
import { TGetUserGameProfilesQuery } from '../types/Party';

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

export const useGameDetail = (payload: number) => {
	return useQuery<TGameDetailResponse, Error, TGameDetailResponse, ['games', number]>({
		queryKey: ['games', payload],
		queryFn: async () => {
			const response = await fetchGameDetail(payload);
			return response;
		},
	});
};

export const useUserGameProfiles = (payload: TGetUserGameProfilesQuery) => {
	if (payload.userId === undefined) {
		throw new Error('userId is required');
	}
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
	});
};
