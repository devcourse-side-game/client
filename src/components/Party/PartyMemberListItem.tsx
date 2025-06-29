import React, { useState } from 'react';
import { Stack, Avatar, Typography, Chip, Button, Box } from '@mui/material';
import { TPartyMember } from '../../types/Party';
import { PARTY_LIST_ITEM } from '../../constants/Party';
import { useModal } from '../../hooks/useModal';
import {
	PartyMemberListItemWrapper,
	PartyMemberListWrapper,
} from '../../styles/pages/party/PartyListItem.style';
import { StarBorderRounded, StarRounded } from '@mui/icons-material';

type TPartyMemberListItemProps = {
	member: TPartyMember;
	partyId: number | null;
};

function PartyMemberListItem({ member, partyId }: TPartyMemberListItemProps) {
	const { openModal } = useModal();
	const [isLeader, setIsLeader] = useState<boolean>(true);
	// 파티장 여부 확인

	const handleOnBanButtonClick = () => {
		console.log(`ban in party id : ${partyId}`);
		if (partyId)
			openModal('memberBan', {
				partyId: partyId,
				userId: member.id,
				userName: member.user.username,
			});
	};
	const handleOnLeaderChangeButtonClick = () => {
		if (partyId)
			openModal('leaderChange', {
				partyId: partyId,
				userId: member.id,
				userName: member.user.username,
			});
	};
	return (
		<PartyMemberListWrapper>
			<PartyMemberListItemWrapper>
				<Avatar alt='tester'></Avatar>
				<Box>
					<Stack direction='row' alignItems='center' spacing={0.5}>
						<Typography variant='h6'>{member.user.username}</Typography>
						{member.isLeader ? (
							<Chip size='small' variant='filled' color='info' label='파티장' />
						) : (
							<></>
						)}
						{isLeader && !member.isLeader ? (
							<Button onClick={handleOnLeaderChangeButtonClick}>파티장 넘기기</Button>
						) : (
							<></>
						)}
					</Stack>
					<Typography variant='body2'>닉네임이!</Typography>
				</Box>
				<Box sx={{ flexGrow: 1 }}></Box>
				{isLeader && !member.isLeader ? (
					<Button variant='contained' color='warning' onClick={handleOnBanButtonClick}>
						{PARTY_LIST_ITEM.BTN_MEMBER_BAN_TEXT}
					</Button>
				) : (
					<></>
				)}
				<Button>좋아요</Button>
				<StarRounded color='primary' />
				<StarBorderRounded color='primary' />
			</PartyMemberListItemWrapper>
		</PartyMemberListWrapper>
	);
}
export default PartyMemberListItem;
