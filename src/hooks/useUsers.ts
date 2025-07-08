import { useQuery } from '@tanstack/react-query';
import { searchMyDataApi } from '../api/user';
import { useSelector } from 'react-redux';
import { RootState } from '../stores';

export function useUser() {
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
	console.log('isLoggedIn', isLoggedIn);

	return useQuery({
		queryKey: ['me'],
		queryFn: searchMyDataApi,
		staleTime: Infinity,
		enabled: isLoggedIn,
	});
}
