import React, { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import PartyListItem from './PartyListItem';
import { TParty } from '../../types/Party';
import { PartyListContainer } from '../../styles/pages/party/PartyList.styles';
import { IPartiesResponse } from '../../types/response';

type TPartyListProps = {
	data: IPartiesResponse | undefined;
	isLoading: boolean;
	isFetching: boolean;
	isSuccess: boolean;
	isError: boolean;
	error: Error | null;
};

function PartyList({ data, isLoading, isFetching, isSuccess, isError, error }: TPartyListProps) {
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
			<Stack>
				{data?.map((party: TParty) =>
					party ? (
						<PartyListItem
							key={party.id}
							party={party}
							expandedPartyId={expandedPartyId}
							setExpandedPartyId={setExpandedPartyId}
						/>
					) : null
				)}
			</Stack>
		</PartyListContainer>
	);
}

export default PartyList;
