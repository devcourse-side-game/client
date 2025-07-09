import { createTheme } from '@mui/material/styles';
import { ThemeType } from './constants/enums';

declare module '@mui/material/styles' {
	interface Theme {
		customColor: {
			mode: ThemeType;
			background: {
				mainBg: string;
				subBg: string;
			};
			header: {
				bg: string;
				logoText: string;
			};
			title: {
				main: string;
				sub: string;
			};
			button: {
				selectBg: string;
				defaultBg: string;
				defaultText: string;
				selectText: string;
				borderColor: string;
			};
			defaultText: string;
			mainButton: string;
			grayText: string;
			validatText: string;
		};
	}

	interface ThemeOptions {
		customColor?: {
			mode?: ThemeType;
			background: {
				mainBg?: string;
				subBg?: string;
			};
			title: {
				main: string;
				sub: string;
			};
			header: {
				bg: string;
				logoText: string;
			};
			button: {
				selectBg: string;
				defaultBg: string;
				defaultText: string;
				selectText: string;
				borderColor: string;
			};
			defaultText?: string;
			mainButton?: string;
			grayText?: string;
			validatText?: string;
		};
	}
}
export const customThemeMap = {
	[ThemeType.LIGHT]: createTheme({
		customColor: {
			mode: ThemeType.LIGHT,
			background: {
				mainBg: '#fff',
				subBg: '#000',
			},
			header: {
				bg: '#f1f2f6',
				logoText: '#1e272e',
			},
			title: {
				main: '#5352ed',
				sub: '#D8B4FE',
			},
			button: {
				selectBg: '#AB5CFD',
				defaultBg: '#f1f2f6',
				defaultText: '#000',
				selectText: '#fff',
				borderColor: '#ddd',
			},
			defaultText: '#000',
			grayText: '#ddd',
			validatText: '#2ecc71',
		},
		palette: {
			background: {
				default: '#f1f2f6',
				paper: '#ffffff',
			},
			text: {
				primary: '#000000',
				secondary: '#cb9aff',
			},
		},
	}),
	[ThemeType.DARK]: createTheme({
		customColor: {
			mode: ThemeType.DARK,
			background: {
				mainBg: '#1e272e',
				subBg: '#fff',
			},
			header: {
				bg: '#1e272e',
				logoText: '#f1f2f6',
			},
			title: {
				main: '#70a1ff',
				sub: '#D8B4FE',
			},
			button: {
				selectBg: '#AB5CFD',
				defaultBg: '#1e272e',
				defaultText: '#ddd',
				selectText: '#fff',
				borderColor: '#ddd',
			},
			defaultText: '#fff',
			grayText: '#7f8c8d',
			validatText: '#2ecc71',
		},
		palette: {
			background: {
				default: '#2d3436',
				paper: '#1e1e1e',
			},
			text: {
				primary: '#ffffff',
				secondary: '#cccccc',
			},
		},
	}),
};
