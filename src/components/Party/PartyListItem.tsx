import React, { Dispatch, SetStateAction } from 'react';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Box,
	Chip,
	Stack,
	Button,
} from '@mui/material';
import { getTimeAgo } from '../../utils/formatters/date';
import { TModalState, TParty } from '../../types/Party';
import PartyListItemDetail from './PartyListItemDetail';

// 임시 데이터 타입 및 더미데이터

export type TPartyListItemProps = {
	key: number;
	party: TParty;
	expandedPartyId: number | null;
	setExpandedPartyId: Dispatch<SetStateAction<number | null>>;
	onModalOpne: (state: TModalState) => void;
};

function PartyListItem({
	party,
	expandedPartyId,
	setExpandedPartyId,
	onModalOpne,
}: TPartyListItemProps) {
	// props => listItem: PartyListItemProps | null = dummyItem
	// 아코디언 확장시 파티 세부 정보 api 호출

	const handleOnAccordionChange = () => {
		if (expandedPartyId === party.id) setExpandedPartyId(null);
		else setExpandedPartyId(party.id);
	};

	// 리스트 아이템 클릭 시
	return (
		<Accordion expanded={expandedPartyId === party.id} onChange={handleOnAccordionChange}>
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
				<PartyListItemDetail partyId={party.id} />
				<Button
					onClick={() => {
						console.log(`참가버튼 클릭 : ${party.id}`);
						onModalOpne({ type: 'join', payload: { partyId: party.id } });
					}}
				>
					파티 참가
				</Button>
			</AccordionDetails>
		</Accordion>
	);
}

export default PartyListItem;
