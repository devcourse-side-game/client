import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const HomeContainer = styled(Box)(({ theme }) => ({
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
}));
