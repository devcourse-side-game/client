import api from './axios';
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
} from '../types/party';
import { IJoinPartyResponse, IPartiesResponse } from '../types/response';
import { IJoinPartyRequest } from '../types/request';

/** 기능 : 파티 목록 조회 */
export const fetchParties = async (queryParams: URLSearchParams): Promise<IPartiesResponse> => {
	const url = `/parties?${queryParams}`;
	const response = await api.get<IPartiesResponse>(url);
	return response.data;
};

/** 기능 : 파티 세부 정보 조회 */
export const fetchPartyDetail = async (
	queryParams: URLSearchParams
): Promise<TPartyListItemDetailResponse> => {
	const url = `/parties/${queryParams}`;
	const response = await api.get<TPartyListItemDetailResponse>(url);
	return response.data;
};

/** 기능 : 파티 생성 */
export const createParty = async (
	payload: TPartyCreateRequest
): Promise<TPartyCreateSuccessResponse> => {
	const url = `/parties`;
	const response = await api.post<TPartyCreateSuccessResponse>(url, payload);
	return response.data;
};

/** 기능 : 파티 참여 */
export const joinParty = async (payload: IJoinPartyRequest): Promise<IJoinPartyResponse> => {
	const { partyId } = payload;
	const body = {
		gameUsername: payload.gameUsername,
		profileId: payload.profileId,
		accessCode: payload.accessCode,
	};

	const response = await api.post<IJoinPartyResponse>(`/parties/${partyId}/members`, body);
	return response.data;
};

/** 기능 : 파티 멤버 강퇴 */
export const banPartyMember = async (params: TBanPartyMemberParams): Promise<void> => {
	const { partyId, userId } = params;
	const response = await api.delete<void>(`/parties/${partyId}/members/${userId}`);
	return response.data;
};

/** 기능 : 파티장 변경 */
export const changePartyLeader = async (params: TChangePartyLeaderParams): Promise<void> => {
	const { partyId, userId } = params;
	const response = await api.put<void>(`/parties/${partyId}/members/leader/${userId}`, {
		data: {},
	});
	return response.data;
};

/** 기능 : 파티 해체 */
export const disbandParty = async (params: TPartyDisbandData): Promise<void> => {
	const { partyId } = params;
	const response = await api.delete<void>(`/parties/${partyId}`);
	return response.data;
};

/** 기능 : 파티 완료 */
export const partyComplete = async (params: TPartyCompleteData): Promise<void> => {
	const { partyId } = params;
	const response = await api.patch<void>(`/parties/${partyId}/complete`);
	return response.data;
};

/** 기능 : 파티 나가기 */
export const leaveParty = async (params: TLeavePartyParams): Promise<void> => {
	const { partyId } = params;
	const response = await api.delete<void>(`/parties/${partyId}/members`);
	return response.data;
};

/** 기능 : 내 파티 목록 조회 */
export const fetchPartiesMine = async (queryParams: URLSearchParams): Promise<IPartiesResponse> => {
	const url = `/parties/me?${queryParams}`;
	const response = await api.get<IPartiesResponse>(url);
	return response.data;
};
