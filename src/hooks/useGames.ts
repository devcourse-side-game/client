import { useQuery } from '@tanstack/react-query';
import { TGetGameListResponse } from '../types/response';
import { GetGameListRequest } from '../types/request';
import { fetchGameList } from '../api/games';

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
