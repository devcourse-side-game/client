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
	isCompleted: boolean;
};

function PartyMemberListItem({ member, partyId, isCompleted }: TPartyMemberListItemProps) {
	const { openModal } = useModal();
	const [isLeader, setIsLeader] = useState<boolean>(true);
	// 파티장 여부 확인

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
		<PartyMemberListWrapper>
			<PartyMemberListItemWrapper>
				<Avatar alt='tester'></Avatar>
				<Box>
					<Stack direction='row' alignItems='center' spacing={0.5}>
						<Typography variant='h6'>{member.username}</Typography>
						{member.isLeader ? (
							<Chip size='small' variant='filled' color='info' label='파티장' />
						) : (
							<></>
						)}
						{isLeader && !member.isLeader && !isCompleted ? (
							<>
								<Button
									onClick={handleOnLeaderChangeButtonClick}
									disabled={isCompleted}
								>
									파티장 넘기기
								</Button>
							</>
						) : (
							<></>
						)}
					</Stack>
					<Typography variant='body2'>{member.gameUsername}</Typography>
				</Box>
				<Box sx={{ flexGrow: 1 }}></Box>
				{isLeader ? (
					<Button
						variant='contained'
						color='warning'
						onClick={handleOnBanButtonClick}
						disabled={isCompleted || member.isLeader || !isLeader}
					>
						{PARTY_LIST_ITEM.BTN_MEMBER_BAN_TEXT}
					</Button>
				) : (
					<></>
				)}
				<Button disabled={isCompleted}>좋아요</Button>
				<StarRounded color='primary' />
				<StarBorderRounded color='primary' />
			</PartyMemberListItemWrapper>
		</PartyMemberListWrapper>
	);
}
export default PartyMemberListItem;
