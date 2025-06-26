import axios from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';
import {
	TFilterOptions,
	TGetPartiesResponse,
	TPartyCreateRequest,
	TPartyCreateSuccessResponse,
	TPartyListItemDetailResponse,
} from '../types/Party';

const API_BASE_URL_MOCK = 'http://localhost:3001';
/** 기능 : 파티 목록 조회 */
export const fetchParties = async ({
	queryKey,
}: QueryFunctionContext<['parties', TFilterOptions[]]>): Promise<TGetPartiesResponse> => {
	const [_queryName, filterOptions] = queryKey;

	let optionGameParam = '';
	// let optionPartyOwnerNameParam = '';
	// let optionPartyTitleParam = '';

	if (filterOptions.length) {
		// 필터 옵션 적용type을 Enum 또는 상수화 필요
		const optionGameId = filterOptions.find((option) => option.type === 'gameId');
		console.log('test : ' + optionGameId?.label);
		optionGameParam = optionGameId?.value ? `game_id=${optionGameId.value}` : '';

		// optionPartyOwnerName 와 optionPartyTitle 은 백엔드와 회의 후 추후 옵션 추가 필요
		// const optionPartyOwnerName = filterOptions.find(
		// 	(option) => option.type === 'partyOwnerName'
		// );
		// optionPartyOwnerNameParam = optionPartyOwnerName?.value ? '' : '';
		// const optionPartyTitle = filterOptions.find((option) => option.type === 'partyTitle');
		// optionPartyTitleParam = optionPartyTitle?.value ? '' : '';
	}
	const apiURLParams = `?${optionGameParam}`;
	const response = await axios.get<TGetPartiesResponse>(
		`${API_BASE_URL_MOCK}/api/parties${apiURLParams}`
	);
	console.log(`fetch url : ${API_BASE_URL_MOCK}/api/parties${apiURLParams}`);
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

export const createParty = async (
	newParty: TPartyCreateRequest
): Promise<TPartyCreateSuccessResponse> => {
	try {
		const response = await axios.post<TPartyCreateSuccessResponse>(
			`${API_BASE_URL_MOCK}/api/parties`,
			newParty
		);
		return response.data;
	} catch (error) {
		console.error('API Error: Failed to create party', error);
		throw error;
	}
};
