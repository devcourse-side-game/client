import axios from 'axios';
//import api from './axios';
import { QueryFunctionContext } from '@tanstack/react-query';
import {
	TFilterOptions,
	TPartyCreateRequest,
	TPartyCreateSuccessResponse,
	TPartyListItemDetailResponse,
} from '../types/Party';
import { IPartiesResponse } from '../types/response';

// const API_BASE_URL_MOCK = 'http://localhost:3001';
const API_BASE_URL_PROTO = 'http://localhost:3002';
const TEST_TOKEN =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInVzZXJuYW1lIjoic29yaTEyMyIsImVtYWlsIjoidGVzdHNvcmkxMjNAZ21haWwuY29tIiwiaWF0IjoxNzUxMjEzNzUzLCJleHAiOjE3NTEyMTQzNTMsImF1ZCI6InRlc3Rzb3JpMTIzQGdtYWlsLmNvbSIsImlzcyI6ImdhbWUtcGFydHkifQ.ljVzBnUr_SrY5lQ-EeigSptGKUQeYUtmmhTP848SzpI';

const API_TESTBASE_URL = API_BASE_URL_PROTO;
/** 기능 : 파티 목록 조회 */
export const fetchParties = async ({
	queryKey,
}: QueryFunctionContext<['parties', TFilterOptions[]]>): Promise<IPartiesResponse> => {
	const [_queryName, filterOptions] = queryKey;
	console.log(_queryName);

	let optionGameParam = '';
	// let optionPartyOwnerNameParam = '';
	// let optionPartyTitleParam = '';

	// 필터 옵션에 따라 URL 변경
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
	const url = `${API_TESTBASE_URL}/api/parties${apiURLParams}`;
	// const response = await api.get<TGetPartiesResponse>(url);
	const response = await axios.get<IPartiesResponse>(url, {
		headers: {
			Authorization: `Bearer ${TEST_TOKEN}`,
		},
	});
	return response.data;
};
/** 기능 : 파티 세부 정보 조회 */
export const fetchPartyDetail = async (payload: number): Promise<TPartyListItemDetailResponse> => {
	console.log(payload);
	const response = await axios.get<TPartyListItemDetailResponse>(
		`${API_TESTBASE_URL}/api/parties/${payload}`,
		{
			headers: {
				Authorization: `Bearer ${TEST_TOKEN}`,
			},
		}
	);
	return response.data;
};
//데이터가 소팅된 상태로 넘어오나? 날짜별로 소팅하는 시점은?

export const createParty = async (
	payload: TPartyCreateRequest
): Promise<TPartyCreateSuccessResponse> => {
	try {
		const response = await axios.post<TPartyCreateSuccessResponse>(
			`${API_TESTBASE_URL}/api/parties`,
			payload
		);
		return response.data;
	} catch (error) {
		console.error('API Error: Failed to create party', error);
		throw error;
	}
};
