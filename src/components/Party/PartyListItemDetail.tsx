import React, { useEffect, useState } from 'react';
import { useSelectedPartyDetail } from '../../hooks/useParties';
import { Button, Stack, Typography } from '@mui/material';
import { PARTY_LIST_ITEM } from '../../constants/Party';
import PartyMemberList from './PartyMemberList';
import { PartyListItemButtonWrapper } from '../../styles/pages/party/PartyListItem.style';
import { useModal } from '../../hooks/useModal';

type TPartyListItemDetailProps = {
	partyId: number;
};

function PartyListItemDetail({ partyId }: TPartyListItemDetailProps) {
	const { data, isLoading, isError, error } = useSelectedPartyDetail(partyId);
	const { openModal } = useModal();
	const [isPartyMember, setIsPartyMember] = useState<boolean>(false);
	useEffect(() => {
		if (data) {
			setIsPartyMember(
				data?.members.some((member) => member.userId === member.userId) || false
				// 사용자의 id를 member.userId로 넣어야 함
			);
		}
	}, [data]);
	if (isLoading) return <div>파티세부 정보 로딩중...</div>;
	if (isError) return <div> 에러가 발생했습니다 : {error.message} </div>;

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
					data ? data.members.length : null,
					data ? data.maxParticipants : null
				)}
			</Typography>
			<PartyMemberList members={data ? data.members : null} partyId={data ? data.id : null} />
			<PartyListItemButtonWrapper>
				<Button
					variant='contained'
					onClick={() => {
						openModal('join', { partyId: partyId });
					}}
				>
					파티 참가
				</Button>
			</PartyListItemButtonWrapper>
		</Stack>
	);
}

export default PartyListItemDetail;
