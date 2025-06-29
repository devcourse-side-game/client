import { QueryFunctionContext, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	TFilterOptions,
	TPartyCreateRequest,
	TPartyCreateSuccessResponse,
	TPartyListItemDetailResponse,
} from '../types/Party';
import { createParty, fetchParties, fetchPartyDetail } from '../api/parties';
import { IPartiesResponse } from '../types/response';
// import { createParty, fetchParties, fetchPartyDetail } from '../api/parties';

export const useParties = (partyListFilterOptions: TFilterOptions[]) => {
	return useQuery<IPartiesResponse, Error, IPartiesResponse, ['parties', TFilterOptions[]]>({
		queryKey: ['parties', partyListFilterOptions],
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

export const useCreateParty = () => {
	const queryClient = useQueryClient();

	return useMutation<TPartyCreateSuccessResponse, Error, TPartyCreateRequest, unknown>({
		mutationFn: createParty,
		onSuccess: (data) => {
			console.log('게시판 생성 성공');
			console.dir(data);
			// 성공했을 시 성공을 알려야함

			queryClient.invalidateQueries({ queryKey: ['parties'] });
		},
		onError: (error) => {
			console.error('게시판 생성 실패', error);
			// 실패시 옵션
		},
	});
};
