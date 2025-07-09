import React, { useEffect, useState } from 'react';
import { useSelectedPartyDetail } from '../../hooks/useParties';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import { PARTY_LIST_ITEM } from '../../constants/Party';
import PartyMemberList from './PartyMemberList';
import { PartyListItemButtonWrapper } from '../../styles/pages/party/PartyListItem.style';
import { useModal } from '../../hooks/useModal';
import { useUser } from '../../hooks/useUsers';
import { FormCommonButton } from '../../styles/pages/party/forms/Form.styles';

type TPartyListItemDetailProps = {
	partyId: number;
	isCompleted: boolean;
};

function PartyListItemDetail({ partyId, isCompleted }: TPartyListItemDetailProps) {
	const { data, isLoading, isError } = useSelectedPartyDetail(partyId);
	const { openModal } = useModal();
	const [isPartyMember, setIsPartyMember] = useState<boolean>(false);
	const { data: user } = useUser();
	const isLeader = data?.creatorId === user?.id;
	const theme = useTheme();

	useEffect(() => {
		if (data && user) {
			setIsPartyMember(data.members.some((member) => member.userId === user.id) || false);
		}
	}, [data, user]);

	if (isLoading) return <div>파티세부 정보 로딩중...</div>;
	if (isError) {
		return (
			<div>
				파티 세부 정보를 불러오는중 문제가 발생했습니다. 반복될경우 관리자에게 문의해주세요
			</div>
		);
	}

	if (!data) {
		return <div>파티 정보를 찾을 수 없습니다.</div>;
	}

	return (
		<Stack direction='column' spacing={2}>
			<Typography variant='h6' align='left'>
				{PARTY_LIST_ITEM.DETAILS_TITLE}
			</Typography>
			<Typography variant='body2' align='left'>
				{data.description || '설명이 없습니다'}
			</Typography>
			<Typography variant='h6' align='left'>
				{PARTY_LIST_ITEM.getPartyMembersTitle(data.members.length, data.maxParticipants)}
			</Typography>
			<PartyMemberList
				members={data.members}
				partyId={data.id}
				isCompleted={isCompleted}
				partyLeaderId={data.creatorId}
			/>
			<PartyListItemButtonWrapper>
				{/* 모집 완료 메시지 */}
				{isCompleted && (
					<Typography
						variant='body2'
						color='text.secondary'
						sx={{ mb: 1, textAlign: 'center' }}
					>
						모집이 완료되어 새로운 멤버를 받지 않습니다
					</Typography>
				)}

				{/* 파티 참가 버튼 - 파티 멤버가 아니고 모집이 완료되지 않은 경우 */}
				{!isPartyMember && !isCompleted && (
					<FormCommonButton
						variant='contained'
						onClick={() => {
							openModal('join', {
								partyId: partyId,
								isPrivate: data.isPrivate || false,
							});
						}}
					>
						파티 참가
					</FormCommonButton>
				)}

				{/* 리더 전용 버튼들 - 리더이고 모집이 완료되지 않은 경우 */}
				{isLeader && !isCompleted && (
					<Stack direction='row' spacing={1}>
						<Button
							variant='contained'
							color='error'
							onClick={() => {
								openModal('partyDisband', { partyId: data.id });
							}}
						>
							파티 해산
						</Button>
						<FormCommonButton
							variant='contained'
							color='primary'
							onClick={() => {
								openModal('partyComplete', { partyId: data.id });
							}}
						>
							파티 모집 완료
						</FormCommonButton>
					</Stack>
				)}

				{/* 파티 나가기 버튼 - 파티 멤버이고 리더가 아니고 모집이 완료되지 않은 경우 */}
				{isPartyMember && !isCompleted && !isLeader && (
					<Button
						variant='contained'
						color='error'
						onClick={() => {
							openModal('leaveParty', {
								partyId: partyId,
								partyTitle: data.title || '',
							});
						}}
					>
						파티 나가기
					</Button>
				)}
			</PartyListItemButtonWrapper>
		</Stack>
	);
}

export default PartyListItemDetail;
