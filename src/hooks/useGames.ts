import { useQuery } from '@tanstack/react-query';
import { GetGameListResponse } from '../types/response';
import { GetGameListRequest, PagenationRequest } from '../types/request';
import { fetchGameList } from '../api/games';

export const useGameList = (pagenation: PagenationRequest) => {
	const payload: GetGameListRequest = {
		// platform이 필수 선택인가? 전체 옵션은 없는가? 서버와 이야기 해보자자
		platform: 'steam',
		isActive: true,
		limit: pagenation.limit,
		page: pagenation.page,
		search: '',
	};

	return useQuery<GetGameListResponse, Error, GetGameListResponse, ['games', GetGameListRequest]>(
		{
			queryKey: ['games', payload],
			queryFn: async () => {
				const response = await fetchGameList(payload);

				return response;
			},
		}
	);
};
