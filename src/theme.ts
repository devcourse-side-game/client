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
		h1: {
			fontSize: '2.5rem',
			fontWeight: 700,
		},
		h2: {
			fontSize: '2rem',
			fontWeight: 600,
		},
		h3: {
			fontSize: '1.75rem',
			fontWeight: 600,
		},
		h4: {
			fontSize: '1.5rem',
			fontWeight: 500,
		},
		h5: {
			fontSize: '1.25rem',
			fontWeight: 500,
		},
		h6: {
			fontSize: '1rem',
			fontWeight: 500,
		},
		body1: {
			fontSize: '1rem',
			fontWeight: 400,
		},
		body2: {
			fontSize: '0.875rem',
			fontWeight: 400,
		},
	},
});

export default theme;
