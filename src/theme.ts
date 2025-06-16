import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#1976d2', // 기본 색상
		},
		secondary: {
			main: '#dc004e',
		},
	},
	typography: {
		fontFamily: 'Roboto, Arial, sans-serif',
	},
});

export default theme;
