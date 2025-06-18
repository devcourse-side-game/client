import axios from 'axios';
import { TGetPartiesResponse, TParty } from '../types/Party';

const API_BASE_URL_MOCK = 'http://localhost:3001';

export const fetchParties = async (): Promise<TGetPartiesResponse> => {
	const response = await axios.get<TGetPartiesResponse>(`${API_BASE_URL_MOCK}/api/parties`);
	return response.data;
};
