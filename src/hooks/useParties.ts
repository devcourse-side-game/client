import {
	InfiniteData,
	QueryFunctionContext,
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import {
	TPartyCreateRequest,
	TPartyCreateSuccessResponse,
	TPartyListItemDetailResponse,
	TGetPartiesPayload,
	TBanPartyMemberParams,
	TChangePartyLeaderParams,
} from '../types/Party';
import {
	banPartyMember,
	changePartyLeader,
	createParty,
	fetchJoinParty,
	fetchParties,
	fetchPartyDetail,
} from '../api/parties';
import { IJoinPartyResponse, IPartiesResponse } from '../types/response';
import { IJoinPartyRequest } from '../types/request';
// import { createParty, fetchParties, fetchPartyDetail } from '../api/parties';

export const useParties = (payload: TGetPartiesPayload) => {
	return useQuery<IPartiesResponse, Error, IPartiesResponse, ['parties', TGetPartiesPayload]>({
		queryKey: ['parties', payload],
		queryFn: ({ queryKey }) => {
			const [_queryName, payload] = queryKey;
			return fetchParties(payload);
		},
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
	});
};
export const useInfiniteParties = (payload: TGetPartiesPayload) => {
	const { limit } = payload.pagination;
	return useInfiniteQuery<
		IPartiesResponse,
		Error,
		InfiniteData<IPartiesResponse>,
		['parties', TGetPartiesPayload],
		number
	>({
		queryKey: ['parties', payload],
		queryFn: ({ pageParam = 1 }) => {
			return fetchParties({
				...payload,
				pagination: { ...payload.pagination, page: pageParam },
			});
		},
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		getNextPageParam: (lastPage, allpage) => {
			if (lastPage.length < limit) {
				return undefined;
			}
			return allpage.length + 1;
		},
		initialPageParam: 1,
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

export const useJoinParty = () => {
	return useMutation<IJoinPartyResponse, Error, IJoinPartyRequest, unknown>({
		mutationFn: fetchJoinParty,
		onSuccess: (data) => {
			console.log('파티 참가 성공');
			console.dir(data);
		},
		onError: (error) => {
			console.error('파티 참가 실패', error);
		},
	});
};

export const useBanPartyMember = (params: TBanPartyMemberParams) => {
	return useMutation<void, Error, TBanPartyMemberParams, unknown>({
		mutationFn: () => banPartyMember(params),
		onSuccess: (data) => {
			console.log('파티 멤버 추방 성공');
			console.dir(data);
		},
		onError: (error) => {
			console.error('파티 멤버 추방 실패', error);
		},
	});
};

export const useChangePartyLeader = (params: TChangePartyLeaderParams) => {
	return useMutation<void, Error, TChangePartyLeaderParams, unknown>({
		mutationFn: () => changePartyLeader(params),
		onSuccess: (data) => {
			console.log('파티 리더 변경 성공');
			console.dir(data);
		},
		onError: (error) => {
			console.error('파티 리더 변경 실패', error);
		},
	});
};
