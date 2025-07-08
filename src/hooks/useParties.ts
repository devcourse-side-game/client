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
	TParty,
	TPartyDisbandData,
	TPartyCompleteData,
	TLeavePartyParams,
} from '../types/party';
import {
	banPartyMember,
	changePartyLeader,
	createParty,
	joinParty,
	fetchParties,
	fetchPartyDetail,
	partyComplete,
	disbandParty,
	leaveParty,
	fetchPartiesMine,
} from '../api/parties';
import { IJoinPartyResponse, IPartiesResponse } from '../types/response';
import { IJoinPartyRequest } from '../types/request';
// import { createParty, fetchParties, fetchPartyDetail } from '../api/parties';

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

export const useInfiniteMyParties = (payload: Pick<TGetPartiesPayload, 'pagination'>) => {
	const { limit } = payload.pagination;
	return useInfiniteQuery<
		IPartiesResponse,
		Error,
		InfiniteData<IPartiesResponse>,
		['parties', 'me', Pick<TGetPartiesPayload, 'pagination'>],
		number
	>({
		queryKey: ['parties', 'me', payload],
		queryFn: ({ pageParam = 1 }) => {
			return fetchPartiesMine({
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
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchInterval: 1000 * 10,
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
	const queryClient = useQueryClient();

	return useMutation<IJoinPartyResponse, Error, IJoinPartyRequest, unknown>({
		mutationFn: joinParty,
		onSuccess: (data, variables) => {
			console.log('파티 참가 성공');

			// 1. 특정 파티의 상세 정보만 갱신
			queryClient.invalidateQueries({
				queryKey: ['selectedPartyDetail', variables.partyId],
			});

			// 2. 파티 목록의 특정 파티만 업데이트 (Optimistic Update)
			queryClient.setQueryData(['parties'], (oldData: InfiniteData<TParty[]> | undefined) => {
				if (!oldData) return oldData;

				return {
					...oldData,
					pages: oldData.pages.map((page) =>
						page.map((party) =>
							party.id === variables.partyId
								? { ...party, currentMemberCount: party.currentMemberCount + 1 }
								: party
						)
					),
				};
			});
		},
		onError: (error) => {
			console.error('파티 참가 실패', error);
		},
	});
};

export const useBanPartyMember = (params: TBanPartyMemberParams) => {
	const queryClient = useQueryClient();
	return useMutation<void, Error, TBanPartyMemberParams, unknown>({
		mutationFn: () => banPartyMember(params),
		onSuccess: (data) => {
			console.log('파티 멤버 추방 성공');
			console.dir(data);
			// 1. 특정 파티의 상세 정보만 갱신
			queryClient.invalidateQueries({
				queryKey: ['selectedPartyDetail', params.partyId],
			});
			// 2. 파티 목록의 특정 파티만 업데이트 (Optimistic Update)
			queryClient.setQueryData(['parties'], (oldData: InfiniteData<TParty[]> | undefined) => {
				if (!oldData) return oldData;

				return {
					...oldData,
					pages: oldData.pages.map((page) =>
						page.map((party) =>
							party.id === params.partyId
								? { ...party, currentMemberCount: party.currentMemberCount - 1 }
								: party
						)
					),
				};
			});
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

export const useDisbandParty = (params: TPartyDisbandData) => {
	const queryClient = useQueryClient();
	return useMutation<void, Error, TPartyDisbandData, unknown>({
		mutationFn: () => disbandParty(params),
		onSuccess: (data) => {
			console.log('파티 해산 성공');
			console.dir(data);
			queryClient.invalidateQueries({ queryKey: ['parties'] });
			queryClient.invalidateQueries({ queryKey: ['selectedPartyDetail', params.partyId] });
			queryClient.setQueryData(['parties'], (oldData: InfiniteData<TParty[]> | undefined) => {
				if (!oldData) return oldData;

				return {
					...oldData,
					pages: oldData.pages.map((page) =>
						page.map((party) =>
							party.id === params.partyId ? { ...party, isCompleted: true } : party
						)
					),
				};
			});
		},
		onError: (error) => {
			console.error('파티 해산 실패', error);
		},
	});
};

export const useCompleteParty = (params: TPartyCompleteData) => {
	const queryClient = useQueryClient();
	return useMutation<void, Error, TPartyCompleteData, unknown>({
		mutationFn: () => partyComplete(params),
		onSuccess: (data) => {
			console.log('파티 완료 성공');
			console.dir(data);
			queryClient.invalidateQueries({ queryKey: ['parties'] });
			queryClient.invalidateQueries({ queryKey: ['selectedPartyDetail', params.partyId] });
			queryClient.setQueryData(['parties'], (oldData: InfiniteData<TParty[]> | undefined) => {
				if (!oldData) return oldData;

				return {
					...oldData,
					pages: oldData.pages.map((page) =>
						page.map((party) =>
							party.id === params.partyId ? { ...party, isCompleted: true } : party
						)
					),
				};
			});
		},
		onError: (error) => {
			console.error('파티 완료 실패', error);
		},
	});
};

export const useLeaveParty = (params: TLeavePartyParams) => {
	const queryClient = useQueryClient();
	return useMutation<void, Error, TLeavePartyParams, unknown>({
		mutationFn: () => leaveParty(params),
		onSuccess: (data) => {
			console.log('파티 탈퇴 성공');
			console.dir(data);
			queryClient.invalidateQueries({ queryKey: ['parties'] });
			queryClient.invalidateQueries({ queryKey: ['selectedPartyDetail', params.partyId] });
			queryClient.setQueryData(['parties'], (oldData: InfiniteData<TParty[]> | undefined) => {
				if (!oldData) return oldData;

				return {
					...oldData,
					pages: oldData.pages.map((page) =>
						page.map((party) =>
							party.id === params.partyId ? { ...party, isCompleted: true } : party
						)
					),
				};
			});
		},
		onError: (error) => {
			console.error('파티 탈퇴 실패', error);
		},
	});
};
