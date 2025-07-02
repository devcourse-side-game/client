import { useQuery } from '@tanstack/react-query';
import { TGameDetailResponse, TGetGameListResponse } from '../types/response';
import { GetGameListRequest } from '../types/request';
import { fetchGameDetail, fetchGameList } from '../api/games';

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
