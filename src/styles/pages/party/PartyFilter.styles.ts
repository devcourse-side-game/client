import { styled } from '@mui/material/styles';
import { Box, Button, Stack } from '@mui/material';

export const PartyFilterContainer = styled(Box)(({ theme }) => ({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'left',
	justifyContent: 'left',
	gap: theme.spacing(2),
	padding: theme.spacing(2),
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: theme.shape.borderRadius,
}));

export const PartyFilterOptionsContainer = styled(Stack)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'left',
	gap: theme.spacing(2),
}));

export const PartyFilterButtonContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'right',
	gap: theme.spacing(2),
}));

export const PartyFilterButton = styled(Button)(({ theme }) => ({
	width: '100px',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	gap: theme.spacing(2),
}));
export const PartyFilterChipContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'left',
	gap: theme.spacing(2),
}));
