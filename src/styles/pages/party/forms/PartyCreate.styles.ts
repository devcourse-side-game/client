import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const PartyCreateContainer = styled(Box)(({ theme }) => ({
	width: '100%',
	minWidth: '200px',
	height: '100%',
	DialogTitle: {
		width: '100%',
		fontSize: '24px',
		fontWeight: 'bold',
		color: theme.palette.primary.main,
	},
}));
