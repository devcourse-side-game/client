import React from 'react';
import { Stack, Avatar, Typography, Chip, Button, Box } from '@mui/material';
import { TPartyMember } from '../../types/Party';
import { PARTY_LIST_ITEM } from '../../constants/Party';
import { useModal } from '../../hooks/useModal';

type TPartyMemberListItemProps = {
	member: TPartyMember;
	partyId: number | null;
};

function PartyMemberListItem({ member, partyId }: TPartyMemberListItemProps) {
	const { openModal } = useModal();

	const handleOnBanButtonClick = () => {
		console.log(`ban in party id : ${partyId}`);
		if (partyId)
			openModal('memberBan', {
				partyId: partyId,
				userId: member.id,
				userName: member.username,
			});
	};
	const handleOnLeaderChangeButtonClick = () => {
		if (partyId)
			openModal('leaderChange', {
				partyId: partyId,
				userId: member.id,
				userName: member.username,
			});
	};
	return (
		<Stack direction='row'>
			<Avatar alt='tester'></Avatar>
			<Stack direction='column'>
				<Stack direction='row' alignItems='center'>
					<Typography variant='subtitle1'>{member.username}</Typography>
					{member.is_leader ? <Chip label='파티장' /> : <></>}
					<Button onClick={handleOnLeaderChangeButtonClick}>파티장 넘기기</Button>
				</Stack>
				<Typography variant='subtitle2'>닉네임이!</Typography>
			</Stack>
			<Box sx={{ flexGrow: 1 }}></Box>

			<Button onClick={handleOnBanButtonClick}>{PARTY_LIST_ITEM.BTN_MEMBER_BAN_TEXT}</Button>
			<Button>좋아요</Button>
		</Stack>
	);
}
export default PartyMemberListItem;
