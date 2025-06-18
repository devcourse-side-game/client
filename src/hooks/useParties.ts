import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { TGetPartiesResponse, TPartyListItemDetailResponse } from '../types/Party';
import { fetchParties, fetchPartyDetail } from '../apis/parties';

export const useParties = () => {
	return useQuery<TGetPartiesResponse, Error>({
		queryKey: ['parties'],
		queryFn: fetchParties,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		//refetchInterval: 1000 * 10,
	});
};

export const useSelectedPartyDetail = (partyId: number) => {
	return useQuery<
		TPartyListItemDetailResponse,
		Error,
		TPartyListItemDetailResponse,
		['selectedPartyDetail', number | undefined]
	>({
		queryKey: ['selectedPartyDetail', partyId],
		queryFn: ({
			queryKey,
		}: QueryFunctionContext<['selectedPartyDetail', number | undefined]>) => {
			const [_queryName, id] = queryKey; // queryKey 배열에서 partyId 추출

			if (id === undefined) {
				throw new Error('Party ID is required to fetch party details.');
			}
			return fetchPartyDetail(id); // 추출한 id를 API 함수에 전달
		},
		// 갱신 설정 조정 필요. 개발중 우선 갱신 안되게 설정.
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		//refetchInterval: 1000 * 10,
	});
};
