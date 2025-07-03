import axios from 'axios';
//import api from './axios';
import {
	TPartyCreateRequest,
	TPartyCreateSuccessResponse,
	TPartyListItemDetailResponse,
	TGetPartiesPayload,
	TBanPartyMemberParams,
	TChangePartyLeaderParams,
} from '../types/Party';
import { IJoinPartyResponse, IPartiesResponse } from '../types/response';
import { IJoinPartyRequest } from '../types/request';

// const API_BASE_URL_MOCK = 'http://localhost:3001';
const API_BASE_URL_PROTO = 'http://localhost:3002';

const API_TESTBASE_URL = API_BASE_URL_PROTO;
/** 기능 : 파티 목록 조회 */
export const fetchParties = async (payload: TGetPartiesPayload): Promise<IPartiesResponse> => {
	const { filterOptions, pagination } = payload;
	const accessToken = localStorage.getItem('accessToken');
	const queryParams = new URLSearchParams();

	// 페이지네이션 파라미터
	queryParams.append('page', pagination.page.toString());
	queryParams.append('limit', pagination.limit.toString());

	// 필터 옵션 파라미터
	if (filterOptions.length) {
		const optionGameId = filterOptions.find((option) => option.type === 'gameId');
		if (optionGameId?.value) {
			queryParams.append('gameId', optionGameId.value.toString());
		}
		// 다른 필터들도 추가...
	}

	const url = `${API_TESTBASE_URL}/api/parties?${queryParams.toString()}`;
	const response = await axios.get<IPartiesResponse>(url, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return response.data;
};

/** 기능 : 파티 세부 정보 조회 */
export const fetchPartyDetail = async (payload: number): Promise<TPartyListItemDetailResponse> => {
	const accessToken = localStorage.getItem('accessToken');
	const response = await axios.get<TPartyListItemDetailResponse>(
		`${API_TESTBASE_URL}/api/parties/${payload}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);
	return response.data;
};
//데이터가 소팅된 상태로 넘어오나? 날짜별로 소팅하는 시점은?

export const createParty = async (
	payload: TPartyCreateRequest
): Promise<TPartyCreateSuccessResponse> => {
	const accessToken = localStorage.getItem('accessToken');
	try {
		const response = await axios.post<TPartyCreateSuccessResponse>(
			`${API_TESTBASE_URL}/api/parties`,
			payload,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error('API Error: Failed to create party', error);
		throw error;
	}
};

export const fetchJoinParty = async (payload: IJoinPartyRequest): Promise<IJoinPartyResponse> => {
	const accessToken = localStorage.getItem('accessToken');
	const response = await axios.post<IJoinPartyResponse>(
		`${API_TESTBASE_URL}/api/parties/join`,
		payload,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);
	return response.data;
};

export const banPartyMember = async (params: TBanPartyMemberParams): Promise<void> => {
	const accessToken = localStorage.getItem('accessToken');
	const { partyId, userId } = params;
	const response = await axios.post<void>(
		`${API_TESTBASE_URL}/api/parties/${partyId}/members/${userId}`,
		{},
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);
	return response.data;
};

export const changePartyLeader = async (params: TChangePartyLeaderParams): Promise<void> => {
	const accessToken = localStorage.getItem('accessToken');
	const { partyId, userId } = params;
	const response = await axios.post<void>(
		`${API_TESTBASE_URL}/api/parties/${partyId}/members/leader/${userId}`,
		{},
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);
	return response.data;
};
