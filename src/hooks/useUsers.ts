import { useQuery } from '@tanstack/react-query';
import { searchMyDataApi } from '../api/user';

export function useUser() {
	return useQuery({
		queryKey: ['me'],
		queryFn: searchMyDataApi,
		staleTime: Infinity,
	});
}
