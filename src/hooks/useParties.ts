import {
	InfiniteData,
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import {
	TBanPartyMemberParams,
	TChangePartyLeaderParams,
	TFilterOption,
	IGetPartiesData,
	TPagination,
	ICreatePartyPayload,
	IPartyDetail,
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

function addFilterOptionsToQueryParams(
	queryParams: URLSearchParams,
	filterOptions: TFilterOption[]
) {
	filterOptions.forEach((option) => {
		queryParams.append(option.type, option.value.toString());
	});
	return queryParams;
}
function addPagenationToQueryParams(queryParams: URLSearchParams, pagination: TPagination) {
	queryParams.append('page', pagination.page.toString());
	queryParams.append('limit', pagination.limit.toString());
	return queryParams;
}

//<TQueryFnData, TError = DefaultError, TData = InfiniteData<TQueryFnData>
export const useInfiniteParties = (getPartiesData: IGetPartiesData) => {
	const { limit } = getPartiesData.pagination;

	return useInfiniteQuery<
		IPartiesResponse,
		Error,
		InfiniteData<IPartiesResponse>,
		['parties', 'all'],
		number
	>({
		queryKey: ['parties', 'all'],
		queryFn: ({ pageParam = 1 }) => {
			// 쿼리 파라미터터 생성
			const { filterOptions, pagination } = getPartiesData;
			const queryParams = new URLSearchParams();
			addFilterOptionsToQueryParams(queryParams, filterOptions);
			addPagenationToQueryParams(queryParams, { ...pagination, page: pageParam });
			return fetchParties(queryParams);
		},
		getNextPageParam: (lastPage, allpage) => {
			if (lastPage.length < limit) {
				return undefined;
			}
			return allpage.length + 1;
		},
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		initialPageParam: 1,
	});
};

export const useInfiniteMyParties = (getPartiesData: Pick<IGetPartiesData, 'pagination'>) => {
	const { limit } = getPartiesData.pagination;
	return useInfiniteQuery<
		IPartiesResponse,
		Error,
		InfiniteData<IPartiesResponse>,
		['parties', 'me'],
		number
	>({
		queryKey: ['parties', 'me'],
		queryFn: ({ pageParam = 1 }) => {
			const { pagination } = getPartiesData;
			const queryParams = new URLSearchParams();
			addPagenationToQueryParams(queryParams, { ...pagination, page: pageParam });
			return fetchPartiesMine(queryParams);
		},
		getNextPageParam: (lastPage, allpage) => {
			if (lastPage.length < limit) {
				return undefined;
			}
			return allpage.length + 1;
		},
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		initialPageParam: 1,
	});
};

export const useSelectedPartyDetail = (partyId: number) => {
	return useQuery<IPartyDetail, Error, IPartyDetail, ['selectedPartyDetail', number]>({
		queryKey: ['selectedPartyDetail', partyId],
		queryFn: () => {
			return fetchPartyDetail(partyId); // 추출한 id를 API 함수에 전달
		},
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchInterval: 1000 * 10,
	});
};

export const useCreateParty = () => {
	const queryClient = useQueryClient();

	return useMutation<IPartyDetail, Error, ICreatePartyPayload>({
		mutationFn: createParty,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['parties'] });
		},
		onError: () => {
			console.error('파티 생성 실패');
			//TODO: 에러 로깅이 들어가면 좋을것 같습니다
		},
	});
};

export const useJoinParty = () => {
	const queryClient = useQueryClient();

	return useMutation<IJoinPartyResponse, Error, IJoinPartyRequest, unknown>({
		mutationFn: joinParty,
		onSuccess: (data, variables) => {
			// 1. 특정 파티의 상세 정보만 갱신
			queryClient.invalidateQueries({
				queryKey: ['selectedPartyDetail', variables.partyId],
			});

			// 2. 파티 목록의 특정 파티만 업데이트 (Optimistic Update)
			queryClient.setQueryData(
				['parties'],
				(oldData: InfiniteData<IPartiesResponse> | undefined) => {
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
				}
			);
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
		onSuccess: () => {
			// 1. 특정 파티의 상세 정보만 갱신
			queryClient.invalidateQueries({
				queryKey: ['selectedPartyDetail', params.partyId],
			});
			// 2. 파티 목록의 특정 파티만 업데이트 (Optimistic Update)
			queryClient.setQueryData(
				['parties'],
				(oldData: InfiniteData<IPartiesResponse> | undefined) => {
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
				}
			);
		},
		onError: (error) => {
			console.error('파티 멤버 추방 실패', error);
		},
	});
};

export const useChangePartyLeader = (params: TChangePartyLeaderParams) => {
	const queryClient = useQueryClient();
	return useMutation<void, Error, TChangePartyLeaderParams, unknown>({
		mutationFn: () => changePartyLeader(params),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['selectedPartyDetail', params.partyId] });
		},
		onError: (error) => {
			console.error('파티 리더 변경 실패', error);
		},
	});
};

export const useDisbandParty = (partyId: number) => {
	const queryClient = useQueryClient();
	return useMutation<void, Error, number, unknown>({
		mutationFn: () => disbandParty(partyId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['parties'] });
			queryClient.invalidateQueries({ queryKey: ['selectedPartyDetail', partyId] });
			queryClient.setQueryData(
				['parties'],
				(oldData: InfiniteData<IPartiesResponse> | undefined) => {
					if (!oldData) return oldData;

					return {
						...oldData,
						pages: oldData.pages.map((page) =>
							page.map((party) =>
								party.id === partyId ? { ...party, isCompleted: true } : party
							)
						),
					};
				}
			);
		},
		onError: (error) => {
			console.error('파티 해산 실패', error);
		},
	});
};

export const useCompleteParty = (partyId: number) => {
	const queryClient = useQueryClient();
	return useMutation<void, Error, number, unknown>({
		mutationFn: () => partyComplete(partyId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['parties'] });
			queryClient.invalidateQueries({ queryKey: ['selectedPartyDetail', partyId] });
			queryClient.setQueryData(
				['parties'],
				(oldData: InfiniteData<IPartiesResponse> | undefined) => {
					if (!oldData) return oldData;

					return {
						...oldData,
						pages: oldData.pages.map((page) =>
							page.map((party) =>
								party.id === partyId ? { ...party, isCompleted: true } : party
							)
						),
					};
				}
			);
		},
		onError: (error) => {
			console.error('파티 완료 실패', error);
		},
	});
};

export const useLeaveParty = (partyId: number) => {
	const queryClient = useQueryClient();
	return useMutation<void, Error, number, unknown>({
		mutationFn: () => leaveParty(partyId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['parties'] });
			queryClient.invalidateQueries({ queryKey: ['selectedPartyDetail', partyId] });
			queryClient.setQueryData(
				['parties'],
				(oldData: InfiniteData<IPartiesResponse> | undefined) => {
					if (!oldData) return oldData;

					return {
						...oldData,
						pages: oldData.pages.map((page) =>
							page.map((party) =>
								party.id === partyId ? { ...party, isCompleted: true } : party
							)
						),
					};
				}
			);
		},
		onError: (error) => {
			console.error('파티 탈퇴 실패', error);
		},
	});
};
