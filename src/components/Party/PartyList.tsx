import React, { forwardRef, useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import PartyListItem from './PartyListItem';
import { IPartyListItem } from '../../types/party';
import { PartyListContainer } from '../../styles/pages/party/PartyList.styles';
import { InfiniteData } from '@tanstack/react-query';
import { IPartiesResponse } from '../../types/response';

type TPartyListProps = {
	data: InfiniteData<IPartiesResponse> | undefined;
	isLoading: boolean;
	isFetching: boolean;
	isSuccess: boolean;
	isError: boolean;
	hasNextPage: boolean;
	error: Error | null;
};

const PartyList = forwardRef<HTMLDivElement, TPartyListProps>(
	({ data, isLoading, isFetching, isSuccess, isError, hasNextPage }, ref) => {
		const [expandedPartyId, setExpandedPartyId] = useState<number | null>(null);

		// parties의 값이 성공적으로 변경됬을 경우 현재 열려야 하는 아코디언 정보를 초기화
		useEffect(() => {
			if (!isFetching && isSuccess) {
				setExpandedPartyId(null);
			}
		}, [isFetching, isSuccess]);

		if (isLoading) return <div>파티 목록 로딩중...</div>;
		if (isError)
			return (
				<Typography variant='body1'>
					{' '}
					파티 목록 로딩중 에러가 발생했습니다. 로그인 하시거나 다시 시도해주세요{' '}
				</Typography>
			);
		return (
			<PartyListContainer>
				{data?.pages
					.flatMap((page) => page)
					.map((party: IPartyListItem) => (
						<PartyListItem
							key={party.id}
							party={party}
							expandedPartyId={expandedPartyId}
							setExpandedPartyId={setExpandedPartyId}
						/>
					))}
				<Box ref={ref} display='flex' justifyContent='center' py={4}>
					{isFetching ? (
						<CircularProgress />
					) : hasNextPage ? null : (
						<Typography variant='body1'>더이상 파티가 없습니다.</Typography>
					)}
				</Box>
			</PartyListContainer>
		);
	}
);

export default React.memo(PartyList);
