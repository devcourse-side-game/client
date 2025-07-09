import { styled } from '@mui/material/styles';
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack } from '@mui/material';

export const PartyListItemContainer = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'left',
}));
export const PartyListItemAccordion = styled(Accordion)(() => ({
	width: '100%',
}));
export const PartyListItemSummaryWrapper = styled(AccordionSummary)(() => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'left',
}));
export const ChipContainer = styled(Stack)(() => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'left',
	height: '40px',
}));

export const PartyListItemDetailsWrapper = styled(AccordionDetails)(() => ({
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
export const PartyListItemButtonWrapper = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'flex-end',
	justifyContent: 'right',
}));
export const GameImageBox = styled(Box)(() => ({
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
	marginBottom: '7px',
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
