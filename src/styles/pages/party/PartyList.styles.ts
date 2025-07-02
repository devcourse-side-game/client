import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const PartyListContainer = styled(Box)(({ theme }) => ({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'left',
	justifyContent: 'left',
	gap: theme.spacing(2),
}));
