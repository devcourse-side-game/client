import { useQuery } from '@tanstack/react-query';
import { TGetPartiesResponse } from '../types/Party';
import { fetchParties } from '../apis/parties';

export const useParties = () => {
	return useQuery<TGetPartiesResponse, Error>({
		queryKey: ['parties'],
		queryFn: fetchParties,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		//refetchInterval: 1000 * 10,
	});
};
