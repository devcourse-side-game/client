import React, { Dispatch, SetStateAction } from 'react';
import { Stack, Button } from '@mui/material';
import { getTimeAgo } from '../../utils/formatters/date';
import { TParty } from '../../types/Party';
import PartyListItemDetail from './PartyListItemDetail';
import { useModal } from '../../hooks/useModal';
import {
	GameImageBox,
	PartyListItemContainer,
	PartyListItemAccordion,
	PartyListItemSummary,
	PartyListItemDetails,
	ChipContainer,
	OptionChip,
	PartyListItemTitleContainer,
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
							<OptionChip label={party.game_name} />
							<OptionChip label={party.is_completed ? '모집완료' : '모집중'} />
							<div>{getTimeAgo(party.created_at)}</div>
						</ChipContainer>
						<PartyListItemTitleContainer direction='row' spacing={0.5}>
							<b>{party.title}</b>
							<div>
								{party.current_participants} / {party.max_participants}
							</div>
						</PartyListItemTitleContainer>
						<div>{party.creator_name}</div>
					</Stack>
				</PartyListItemSummary>
				<PartyListItemDetails>
					<PartyListItemDetail partyId={party.id} />
					{}
					<Button
						onClick={() => {
							console.log(`참가버튼 클릭 : ${party.id}`);
							openModal('join', { partyId: party.id });
							//onModalOpne({ type: 'join', payload: { partyId: party.id } });
						}}
					>
						파티 참가
					</Button>
				</PartyListItemDetails>
			</PartyListItemAccordion>
		</PartyListItemContainer>
	);
}

export default PartyListItem;
