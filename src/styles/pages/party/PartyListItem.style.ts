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
export const OptionChip = styled(Chip)(({ theme }) => ({
	marginRight: theme.spacing(1),
	height: '16px',
}));

export const PartyListItemDetails = styled(AccordionDetails)(({ theme }) => ({
	display: 'flex',
	width: '100%',
	flexDirection: 'column',
	alignItems: 'left',
	justifyContent: 'left',
}));

export const PartyListItemTitleContainer = styled(Stack)(({ theme }) => ({
	fontSize: '16px',
	height: '40px',
}));
export const GameImageBox = styled(Box)(({ theme }) => ({
	height: '87px',
	width: '231px',
	backgroundColor: 'darkcyan',
	textAlign: 'center',
	margin: '10px',
}));
