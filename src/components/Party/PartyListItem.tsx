import React, { Dispatch, SetStateAction } from 'react';
import { Stack, Button, Chip, Typography } from '@mui/material';
import { getTimeAgo } from '../../utils/formatters/date';
import { TParty } from '../../types/Party';
import PartyListItemDetail from './PartyListItemDetail';
import { useModal } from '../../hooks/useModal';
import {
	GameImageBox,
	PartyListItemContainer,
	PartyListItemAccordion,
	PartyListItemSummary,
	PartyListItemDetailsWrapper,
	ChipContainer,
	PartyListItemTitleWrapper,
	PartyListItemButtonWrapper,
} from '../../styles/pages/party/PartyListItem.style';
import GameImage from '../../assets/gameImage.png';
// 임시 데이터 타입 및 더미데이터

export type TPartyListItemProps = {
	key: number;
	party: TParty;
	expandedPartyId: number | null;
	setExpandedPartyId: Dispatch<SetStateAction<number | null>>;
};

function PartyListItem({ party, expandedPartyId, setExpandedPartyId }: TPartyListItemProps) {
	const { openModal } = useModal();
	// 아코디언 확장시 파티 세부 정보 api 호출
	const handleOnAccordionChange = () => {
		if (expandedPartyId === party.id) setExpandedPartyId(null);
		else setExpandedPartyId(party.id);
	};

	// 리스트 아이템 클릭 시
	return (
		<PartyListItemContainer>
			<PartyListItemAccordion
				expanded={expandedPartyId === party.id}
				onChange={handleOnAccordionChange}
			>
				<PartyListItemSummary>
					<GameImageBox>
						<img src={GameImage} alt='game-image' width='100%' height='100%' />
					</GameImageBox>
					<Stack direction='column'>
						<ChipContainer direction='row' spacing={1}>
							<Chip size='small' label={party.game_name} />
							<Chip
								size='small'
								label={party.is_completed ? '모집완료' : '모집중'}
								color={party.is_completed ? 'success' : 'secondary'}
							/>
							<Typography variant='body2'>{getTimeAgo(party.created_at)}</Typography>
						</ChipContainer>
						<PartyListItemTitleWrapper>
							<Typography variant='h6'>{party.title}</Typography>
							<Typography variant='body2'>
								{`(${party.current_participants} / ${party.max_participants})`}
							</Typography>
						</PartyListItemTitleWrapper>
						<Typography variant='body2'>{party.creator_name}</Typography>
					</Stack>
				</PartyListItemSummary>
				<PartyListItemDetailsWrapper>
					<PartyListItemDetail partyId={party.id} />
					{}
					<PartyListItemButtonWrapper>
						<Button
							variant='contained'
							onClick={() => {
								openModal('join', { partyId: party.id });
								//onModalOpne({ type: 'join', payload: { partyId: party.id } });
							}}
						>
							파티 참가
						</Button>
					</PartyListItemButtonWrapper>
				</PartyListItemDetailsWrapper>
			</PartyListItemAccordion>
		</PartyListItemContainer>
	);
}

export default PartyListItem;
