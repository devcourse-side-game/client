import React from 'react';
import { useSelectedPartyDetail } from '../../hooks/useParties';
import { Stack, Typography } from '@mui/material';
import { PARTY_LIST_ITEM } from '../../constants/Party';
import PartyMemberList from './PartyMemberList';

type TPartyListItemDetailProps = {
	partyId: number;
};

function PartyListItemDetail({ partyId }: TPartyListItemDetailProps) {
	const { data, isLoading, isError, error } = useSelectedPartyDetail(partyId);

	if (isLoading) return <div>파티세부 정보 로딩중...</div>;
	if (isError) return <div> 에러가 발생했습니다 : {error.message} </div>;
	console.log(data);
	return (
		<Stack direction='column' spacing={2}>
			<Typography variant='h6' align='left'>
				{PARTY_LIST_ITEM.DETAILS_TITLE}
			</Typography>
			<Typography variant='body2' align='left'>
				{data ? data.description : '설명이 없습니다'}
			</Typography>
			<Typography variant='h6' align='left'>
				{PARTY_LIST_ITEM.getPartyMembersTitle(
					data ? data.current_participants : null,
					data ? data.max_participants : null
				)}
			</Typography>
			<PartyMemberList members={data ? data.members : null} partyId={data ? data.id : null} />
		</Stack>
	);
}

export default PartyListItemDetail;
