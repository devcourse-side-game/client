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
	padding: '8px 0',
	borderRadius: '15px',
}));
export const PartyListItemSummaryWrapper = styled(AccordionSummary)(() => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'left',
}));
export const ChipContainer = styled(Stack)(() => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'left',
}));

export const PartyListItemDetailsWrapper = styled(AccordionDetails)(({ theme }) => ({
	display: 'flex',
	width: '99.5%',
	margin: 'auto',
	alignItems: 'left',
	justifyContent: 'left',
}));

export const PartyListItemTitleWrapper = styled(Stack)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'left',
	fontSize: '16px',
	// height: '40px',
}));
export const PartyListItemButtonWrapper = styled(Box)(() => ({
	width: '100%',
	display: 'flex',
}));
export const GameImageBox = styled(Box)(() => ({
	width: '25%',
	minWidth: '245px',
	marginRight: '15px',
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
	// border: `1px solid ${theme.palette.grey[400]}`,
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
