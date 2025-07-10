import React, { Dispatch, SetStateAction } from 'react';
import { Stack, Chip, Typography, useTheme, Divider, Box } from '@mui/material';
import { getTimeAgo } from '../../utils/formatters/date';
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
import { useGameDetail } from '../../hooks/useGames';
import LockIcon from '@mui/icons-material/Lock';
import { IPartyListItem } from '../../types/party';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { yellow } from '@mui/material/colors';
// 임시 데이터 타입 및 더미데이터

export type TPartyListItemProps = {
	key: number;
	party: IPartyListItem;
	expandedPartyId: number | null;
	setExpandedPartyId: Dispatch<SetStateAction<number | null>>;
};

function PartyListItem({ party, expandedPartyId, setExpandedPartyId }: TPartyListItemProps) {
	const isExpanded = expandedPartyId === party.id;
	const { data: gameDetail } = useGameDetail(party.gameId, true);
	// 아코디언 확장시 파티 세부 정보 api 호출
	const handleOnAccordionChange = () => {
		if (isExpanded) setExpandedPartyId(null);
		else setExpandedPartyId(party.id);
	};
	const theme = useTheme();

	// 리스트 아이템 클릭 시
	return (
		<PartyListItemContainer>
			<PartyListItemAccordion
				expanded={expandedPartyId === party.id}
				onChange={handleOnAccordionChange}
				sx={{
					backgroundColor: theme.customColor.pratyList.bg,
				}}
			>
				<PartyListItemSummaryWrapper
					expandIcon={<ExpandMoreIcon sx={{ color: theme.customColor.defaultText }} />}
				>
					{/* 게임 이미지 */}
					<GameImageBox>
						<img
							src={party.gameBannerUrl ? party.gameBannerUrl : GameImage}
							style={{
								objectFit: 'cover',
								objectPosition: 'center',
							}}
							loading='lazy'
							onError={(e) => {
								e.currentTarget.src = GameImage;
							}}
							alt='game-image'
							width='100%'
							height='100%'
						/>
					</GameImageBox>
					{/* 파티 정보 */}
					<Stack>
						<ChipContainer sx={{ marginBottom: '7px' }} direction='row' spacing={1}>
							{/* 게임 이름 */}
							<span
								style={{
									fontWeight: '600',
									fontSize: '16px',
									letterSpacing: '-0.5px',
								}}
							>
								{gameDetail?.name}
							</span>
							{/* 파티 상태 */}
							<Chip
								size='small'
								sx={{
									textAlign: 'center',
									alignContent: 'center',
									alignItems: 'center',
									span: {
										width: '100%',
										height: '100%',
										marginTop: '2px',
									},
								}}
								label={party.isCompleted ? '모집완료' : '모집중'}
								color={party.isCompleted ? 'success' : 'secondary'}
							/>
							{/* 파티 생성 시간 */}
							<Typography variant='body2'>{getTimeAgo(party.createdAt)}</Typography>
						</ChipContainer>
						<PartyListItemTitleWrapper sx={{ marginBottom: '15px' }} direction='row'>
							{/* 파티 제목 */}
							<Typography variant='h5' sx={{ marginRight: '7px' }}>
								{party.title}
							</Typography>
							<Box
								sx={{ display: 'flex', textAlign: 'center', alignItems: 'center' }}
							>
								{/* 파티 참여 인원 */}
								<Typography
									variant='body2'
									sx={{
										color:
											party.currentMemberCount === party.maxParticipants
												? 'red'
												: theme.customColor.defaultText,
									}}
								>
									{`(${party.currentMemberCount} / ${party.maxParticipants})`}
								</Typography>
								{/* 파티 비공개 여부 */}
								{party.isPrivate ? (
									<LockIcon
										sx={{
											marginBottom: '4px',
											marginLeft: '2px',
											color: yellow[800],
										}}
									/>
								) : null}{' '}
							</Box>
						</PartyListItemTitleWrapper>
						<Box>
							{/* 파티장 정보 */}
							{party.leader && (
								<>
									{/* 파티장 이름 */}
									<Typography sx={{ fontSize: '20px' }} variant='subtitle1'>
										{party.leader.username}
									</Typography>
									{/* 파티장 게임 닉네임 */}
									<Typography variant='subtitle2'>
										{party.leader.gameUsername}
									</Typography>
								</>
							)}
						</Box>
					</Stack>
				</PartyListItemSummaryWrapper>
				{/* 파티 세부 정보 */}
				<PartyListItemDetailsWrapper>
					{isExpanded && (
						<PartyListItemDetail partyId={party.id} isCompleted={party.isCompleted} />
					)}
				</PartyListItemDetailsWrapper>
			</PartyListItemAccordion>
		</PartyListItemContainer>
	);
}

export default PartyListItem;
