import React, { Dispatch, SetStateAction } from 'react';
import { Stack, Button, Chip, Typography } from '@mui/material';
import { getTimeAgo } from '../../utils/formatters/date';
import { TParty } from '../../types/Party';
import PartyListItemDetail from './PartyListItemDetail';
import {
	GameImageBox,
	PartyListItemContainer,
	PartyListItemAccordion,
	PartyListItemSummaryWrapper,
	PartyListItemDetailsWrapper,
	ChipContainer,
	PartyListItemTitleWrapper,
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
				<PartyListItemSummaryWrapper>
					<GameImageBox>
						<img src={GameImage} alt='game-image' width='100%' height='100%' />
					</GameImageBox>
					<Stack direction='column'>
						<ChipContainer direction='row' spacing={1}>
							<Chip size='small' label={'게임 이름'} />
							<Chip
								size='small'
								label={party.isCompleted ? '모집완료' : '모집중'}
								color={party.isCompleted ? 'success' : 'secondary'}
							/>
							<Typography variant='body2'>{getTimeAgo(party.createdAt)}</Typography>
						</ChipContainer>
						<PartyListItemTitleWrapper>
							<Typography variant='h6'>{party.title}</Typography>
							<Typography variant='body2'>
								{`(${8} / ${party.maxParticipants})`}
							</Typography>
						</PartyListItemTitleWrapper>
						<Typography variant='body2'>{'생성인'}</Typography>
					</Stack>
				</PartyListItemSummaryWrapper>
				<PartyListItemDetailsWrapper>
					<PartyListItemDetail partyId={party.id} />
				</PartyListItemDetailsWrapper>
			</PartyListItemAccordion>
		</PartyListItemContainer>
	);
}

export default PartyListItem;
