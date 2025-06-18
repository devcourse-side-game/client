import React from 'react';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Box,
	Chip,
	Stack,
	Typography,
} from '@mui/material';
import { getTimeAgo } from '../../utils/formatters/date';
import PartyMemberList from './PartyMemberList';
import { TPartyListItemProps, TPartyListItemDetailProps } from '../../types/Party';
import { PARTY_LIST_ITEM } from '../../constants/Party';

// 임시 데이터 타입 및 더미데이터

const dummyDetailItem: TPartyListItemDetailProps = {
	id: 1,
	title: '로스트아크 발탄 하드 파티 모집',
	game_id: 1,
	game_name: '로스트아크',
	purpose_tag: '레이드',
	max_participants: 8,
	current_participants: 3,
	start_time: '2025-06-10T18:00:00',
	end_time: '2025-06-10T20:00:00',
	is_completed: false,
	is_private: false,
	creator_id: 1,
	creator_name: 'user123',
	created_at: '2025-06-03T14:30:00+09:00',
	updated_at: '2025-06-03T14:30:00+09:00',
	description: '로스트아크 발탄 하드 파티 모집합니다. 8인 레이드 입니다.',
	members: [
		{
			id: 1,
			username: 'user123',
			is_leader: true,
			joined_at: '2025-06-03T14:30:00+09:00',
		},
		{
			id: 2,
			username: 'user456',
			is_leader: false,
			joined_at: '2025-06-03T14:35:00+09:00',
		},
	],
};

function PartyListItem({ party }: TPartyListItemProps) {
	// props => listItem: PartyListItemProps | null = dummyItem
	// 아코디언 확장시 파티 세부 정보 api 호출
	// 리스트 아이템 클릭 시
	return (
		<Accordion>
			<AccordionSummary>
				<Box
					sx={{
						height: '50px',
						width: '150px',
						backgroundColor: 'darkcyan',
						textAlign: 'center',
						margin: '10px',
					}}
				>
					이미지
				</Box>
				<Stack direction='column'>
					<Stack direction='row' spacing={1}>
						<Chip label={party.game_name} />
						<Chip label={party.is_completed ? '모집완료' : '모집중'} />
						<div>{getTimeAgo(party.created_at)}</div>
					</Stack>
					<Stack direction='row' spacing={0.5}>
						<b>{party.title}</b>
						<div>
							{party.current_participants} / {party.max_participants}
						</div>
					</Stack>
					<div>{party.creator_name}</div>
				</Stack>
			</AccordionSummary>
			<AccordionDetails>
				<Stack direction='column'>
					<Typography variant='subtitle2' align='left'>
						{PARTY_LIST_ITEM.DETAILS_TITLE}
					</Typography>
					<Typography variant='body1' align='left'>
						{dummyDetailItem.description}
					</Typography>
					<Typography variant='subtitle2' align='left'>
						{PARTY_LIST_ITEM.getPartyMembersTitle(
							party.current_participants,
							party.max_participants
						)}
					</Typography>
					<PartyMemberList members={dummyDetailItem.members} />
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
}

export default PartyListItem;
