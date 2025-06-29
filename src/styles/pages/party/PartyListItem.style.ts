import { styled } from '@mui/material/styles';
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Stack } from '@mui/material';

export const PartyListItemContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'left',
}));
export const PartyListItemAccordion = styled(Accordion)(({ theme }) => ({
	width: '100%',
}));
export const PartyListItemSummary = styled(AccordionSummary)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'left',
}));
export const ChipContainer = styled(Stack)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'left',
	height: '40px',
}));

export const PartyListItemDetailsWrapper = styled(AccordionDetails)(({ theme }) => ({
	display: 'flex',
	width: '100%',
	flexDirection: 'column',
	alignItems: 'left',
	justifyContent: 'left',
}));

export const PartyListItemTitleWrapper = styled(Stack)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'flex-end',
	justifyContent: 'left',
	gap: theme.spacing(1),
	fontSize: '16px',
	height: '40px',
}));
export const PartyListItemButtonWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'flex-end',
	justifyContent: 'right',
}));
export const GameImageBox = styled(Box)(({ theme }) => ({
	height: '87px',
	width: '231px',
	backgroundColor: 'darkcyan',
	textAlign: 'center',
	margin: '10px',
}));

// 파티 멤버 관련 스타일
export const PartyMemberListWrapper = styled(Stack)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.spacing(1),
	width: '100%',
}));

export const PartyMemberListItemWrapper = styled(Box)(({ theme }) => ({
	border: `1px solid ${theme.palette.grey[300]}`,
	height: '60px',
	borderRadius: '10px',
	padding: '10px',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.spacing(1),
	width: '100%',
}));
