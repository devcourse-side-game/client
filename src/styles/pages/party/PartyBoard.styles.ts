import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

//container wrapper grid

export const PartyBoardContainer = styled(Box)(({ theme }) => ({
	width: '60%',
	minWidth: '600px',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.spacing(2),
	padding: theme.spacing(2),
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: theme.shape.borderRadius,
}));
export const PartyBoardHeaderWrapper = styled(Box)(({ theme }) => ({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'left',
	justifyContent: 'left',
	gap: theme.spacing(2),
}));
export const PartyButtonWrapper = styled(Box)(({ theme }) => ({
	width: '100%',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'left',
	justifyContent: 'space-between',
	gap: theme.spacing(2),
}));
export const InfiniteScrollContainer = styled(Box)(() => ({
	width: '100%',
	overflowY: 'scroll',
	height: 'calc(100vh - 200px)',
}));
