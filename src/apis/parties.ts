import axios from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';
import { TFilterOptions, TGetPartiesResponse, TPartyListItemDetailResponse } from '../types/Party';

const API_BASE_URL_MOCK = 'http://localhost:3001';
/** 기능 : 파티 목록 조회 */
export const fetchParties = async ({
	queryKey,
}: QueryFunctionContext<['parties', TFilterOptions[]]>): Promise<TGetPartiesResponse> => {
	const [_queryName, filterOptions] = queryKey;
	if (filterOptions.length) {
		// type을 Enum 또는 상수화 필요
		const optionGameId = filterOptions.findIndex((option) => option.type === 'gameId');
		const optionPartyOwnerName = filterOptions.findIndex(
			(option) => option.type === 'partyOwnerName'
		);
		const optionPartyTitle = filterOptions.findIndex((option) => option.type === 'partyTitle');
	}
	const response = await axios.get<TGetPartiesResponse>(`${API_BASE_URL_MOCK}/api/parties`);
	return response.data;
};
/** 기능 : 파티 세부 정보 조회 */
export const fetchPartyDetail = async (partyId: number): Promise<TPartyListItemDetailResponse> => {
	const response = await axios.get<TPartyListItemDetailResponse>(
		`${API_BASE_URL_MOCK}/api/parties/${partyId}`
	);
	return response.data;
};
//데이터가 소팅된 상태로 넘어오나? 날짜별로 소팅하는 시점은?
