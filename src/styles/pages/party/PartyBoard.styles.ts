import { styled } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';

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
export const PartyBoardHeader = styled(Box)(({ theme }) => ({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'left',
	justifyContent: 'left',
	gap: theme.spacing(2),
}));

export const PartyBoardTitle = styled(Typography)({
	fontSize: '1.25rem',
	fontWeight: 600,
});

export const CreatePartyButton = styled(Button)(({ theme }) => ({
	width: '100px',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'right',
	justifyContent: 'center',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	gap: theme.spacing(2),
}));
export const PartyButtonContainer = styled(Box)(({ theme }) => ({
	width: '100%',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'left',
	justifyContent: 'center',
	gap: theme.spacing(2),
}));

export const PartyRefreshButton = styled(Button)(({ theme }) => ({
	width: '100%',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'left',
	justifyContent: 'center',
}));
