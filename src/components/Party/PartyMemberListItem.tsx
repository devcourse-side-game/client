import React, { useEffect, useState } from 'react';
import { Stack, Avatar, Typography, Chip, Button, Box } from '@mui/material';
import { TPartyMember } from '../../types/party';
import { PARTY_LIST_ITEM } from '../../constants/Party';
import { useModal } from '../../hooks/useModal';
import {
	PartyMemberListItemWrapper,
	PartyMemberListWrapper,
} from '../../styles/pages/party/PartyListItem.style';
import { useUser } from '../../hooks/useUsers';

type TPartyMemberListItemProps = {
	member: TPartyMember;
	partyId: number | null;
	isCompleted: boolean;
	partyLeaderId: number | null;
};

function PartyMemberListItem({
	member,
	partyId,
	isCompleted,
	partyLeaderId,
}: TPartyMemberListItemProps) {
	const { openModal } = useModal();
	const [isLeader, setIsLeader] = useState<boolean>(false);
	// 파티장 여부 확인
	const { data: user } = useUser();
	useEffect(() => {
		if (user) {
			setIsLeader(user.id === partyLeaderId);
		}
	}, [user, partyLeaderId]);

	const handleOnBanButtonClick = () => {
		console.log(`ban in party id : ${partyId}`);
		if (partyId)
			openModal('memberBan', {
				partyId: partyId,
				userId: member.userId,
				userName: member.username,
			});
	};
	const handleOnLeaderChangeButtonClick = () => {
		if (partyId)
			openModal('leaderChange', {
				partyId: partyId,
				userId: member.userId,
				userName: member.username,
			});
	};
	return (
		<PartyMemberListWrapper>
			<PartyMemberListItemWrapper>
				<Avatar alt='tester'></Avatar>
				<Box>
					<Stack direction='row' alignItems='center' spacing={0.5}>
						{/* 유저 이름 */}
						<Typography
							variant='h6'
							color={member.userId === user?.id ? 'info' : 'textPrimary'}
						>
							{member.username}
						</Typography>
						{/* 파티장 여부 */}
						{member.isLeader ? (
							<Chip size='small' variant='filled' color='info' label='파티장' />
						) : (
							<></>
						)}
						{/* 파티장 넘기기 버튼 */}
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
					{/* 게임 닉네임 */}
					<Typography variant='body2'>{member.gameUsername}</Typography>
				</Box>
				<Box sx={{ flexGrow: 1 }}></Box>
				{/* 강퇴 버튼 */}
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
			</PartyMemberListItemWrapper>
		</PartyMemberListWrapper>
	);
}
export default PartyMemberListItem;
