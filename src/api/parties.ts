import axios from 'axios';
//import api from './axios';
import {
	TPartyCreateRequest,
	TPartyCreateSuccessResponse,
	TPartyListItemDetailResponse,
	TGetPartiesPayload,
	TBanPartyMemberParams,
	TChangePartyLeaderParams,
	TPartyDisbandData,
	TPartyCompleteData,
	TLeavePartyParams,
} from '../types/Party';
import { IJoinPartyResponse, IPartiesResponse } from '../types/response';
import { IJoinPartyRequest } from '../types/request';

const API_BASE_URL_PROTO = 'http://localhost:3000';
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

export const joinParty = async (payload: IJoinPartyRequest): Promise<IJoinPartyResponse> => {
	const accessToken = localStorage.getItem('accessToken');
	const { partyId } = payload;
	const body = {
		gameUsername: payload.gameUsername,
		profileId: payload.profileId,
		accessCode: payload.accessCode,
	};
	console.log('요청 보내짐');
	const response = await axios.post<IJoinPartyResponse>(
		`${API_TESTBASE_URL}/api/parties/${partyId}/members`,
		body,
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
	const response = await axios.delete<void>(
		`${API_TESTBASE_URL}/api/parties/${partyId}/members/${userId}`,
		{ data: {}, headers: { Authorization: `Bearer ${accessToken}` } }
	);
	return response.data;
};

export const changePartyLeader = async (params: TChangePartyLeaderParams): Promise<void> => {
	const accessToken = localStorage.getItem('accessToken');
	const { partyId, userId } = params;
	const response = await axios.put<void>(
		`${API_TESTBASE_URL}/api/parties/${partyId}/members/leader/${userId}`,
		{ data: {}, headers: { Authorization: `Bearer ${accessToken}` } }
	);
	return response.data;
};

export const disbandParty = async (params: TPartyDisbandData): Promise<void> => {
	const accessToken = localStorage.getItem('accessToken');
	const { partyId } = params;
	const response = await axios.delete<void>(`${API_TESTBASE_URL}/api/parties/${partyId}`, {
		headers: { Authorization: `Bearer ${accessToken}` },
	});
	return response.data;
};
export const partyComplete = async (params: TPartyCompleteData): Promise<void> => {
	const accessToken = localStorage.getItem('accessToken');
	const { partyId } = params;
	const response = await axios.patch<void>(
		`${API_TESTBASE_URL}/api/parties/${partyId}/complete`,
		{},
		{
			headers: { Authorization: `Bearer ${accessToken}` },
		}
	);
	return response.data;
};

export const leaveParty = async (params: TLeavePartyParams): Promise<void> => {
	const accessToken = localStorage.getItem('accessToken');
	const { partyId } = params;
	const response = await axios.delete<void>(
		`${API_TESTBASE_URL}/api/parties/${partyId}/members`,
		{
			headers: { Authorization: `Bearer ${accessToken}` },
		}
	);
	return response.data;
};
