import { createTheme } from '@mui/material/styles';
import { ThemeType } from './constants/enums';

export const themeMap = {
	[ThemeType.LIGHT]: createTheme({
		palette: {
			mode: 'light',
			primary: {
				main: '#1976d2',
			},
			secondary: {
				main: '#ff4081',
			},
			background: {
				default: '#f5f5f5',
				paper: '#ffffff',
			},
			text: {
				primary: '#000000',
				secondary: '#555555',
			},
		},
	}),
	[ThemeType.DARK]: createTheme({
		palette: {
			mode: 'dark',
			primary: {
				main: '#90caf9',
			},
			secondary: {
				main: '#f48fb1',
			},
			background: {
				default: '#121212',
				paper: '#1e1e1e',
			},
			text: {
				primary: '#ffffff',
				secondary: '#cccccc',
			},
		},
	}),
};

export default themeMap;
