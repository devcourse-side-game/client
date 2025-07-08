import React, { useEffect, useState } from 'react';
import { useSelectedPartyDetail } from '../../hooks/useParties';
import { Button, Stack, Typography } from '@mui/material';
import { PARTY_LIST_ITEM } from '../../constants/Party';
import PartyMemberList from './PartyMemberList';
import { PartyListItemButtonWrapper } from '../../styles/pages/party/PartyListItem.style';
import { useModal } from '../../hooks/useModal';
import { useUser } from '../../hooks/useUsers';

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
	useEffect(() => {
		if (data) {
			setIsPartyMember(data?.members.some((member) => member.userId === user?.id) || false);
		}
	}, [data, user]);
	if (isLoading) return <div>파티세부 정보 로딩중...</div>;
	if (isError) {
		return (
			<div>
				{' '}
				파티 세부 정보를 불러오는중 문제가 발생했습니다. 반복될경우 관리자에게
				문의해주세요{' '}
			</div>
		);
	}

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
			<PartyMemberList
				members={data ? data.members : null}
				partyId={data ? data.id : null}
				isCompleted={isCompleted}
				partyLeaderId={data ? data.creatorId : null}
			/>
			<PartyListItemButtonWrapper>
				{isCompleted && (
					<Typography
						variant='body2'
						color='text.secondary'
						sx={{ mb: 1, textAlign: 'center' }}
					>
						모집이 완료되어 새로운 멤버를 받지 않습니다
					</Typography>
				)}
				{!isPartyMember ? (
					<Button
						variant='contained'
						disabled={isCompleted}
						onClick={() => {
							openModal('join', {
								partyId: partyId,
								isPrivate: data?.isPrivate || false,
							});
						}}
					>
						{isCompleted ? '모집 완료' : '파티 참가'}
					</Button>
				) : (
					<></>
				)}
				{isLeader && !isCompleted ? (
					<Stack direction='row' spacing={1}>
						<Button
							variant='contained'
							color='error'
							onClick={() => {
								if (data?.id) {
									openModal('partyDisband', { partyId: data.id });
								}
							}}
						>
							파티 해산
						</Button>
						<Button
							variant='contained'
							color='primary'
							onClick={() => {
								if (data?.id) {
									openModal('partyComplete', { partyId: data.id });
								}
							}}
						>
							파티 모집 완료
						</Button>
					</Stack>
				) : (
					<></>
				)}
				{isPartyMember && !isCompleted && !isLeader ? (
					<Button
						variant='contained'
						color='error'
						onClick={() => {
							console.log(data);
							openModal('leaveParty', {
								partyId: partyId,
								partyTitle: data?.title || '',
							});
						}}
					>
						파티 나가기
					</Button>
				) : (
					<></>
				)}
			</PartyListItemButtonWrapper>
		</Stack>
	);
}

export default PartyListItemDetail;
