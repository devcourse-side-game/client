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
			input: {
				text: string;
				bg: string;
				subBg?: string;
				border: string;
			};
			pratyList: {
				bg: string;
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
			input: {
				text: string;
				bg: string;
				subBg?: string;
				border: string;
			};
			pratyList: {
				bg: string;
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
				main: '#9b59b6',
				sub: '#be93dc',
			},
			button: {
				selectBg: '#9b59b6',
				defaultBg: '#f1f2f6',
				defaultText: '#000',
				selectText: '#ffffff',
				borderColor: '#ddd',
			},
			input: {
				text: '#1e1e23',
				bg: '#f3e8ff',
				subBg: '#f1f2f6',
				border: '#9b59b6',
			},
			pratyList: {
				bg: '#e6e0f3',
			},
			defaultText: '#000',
			grayText: '#7f8c8d',
			validatText: '#2ecc71',
		},
		palette: {
			background: {
				default: '#f1f2f6',
				paper: '#e6e0f3',
			},
			text: {
				primary: '#000000',
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
				bg: '#1c1b22',
				logoText: '#f1f2f6',
			},
			title: {
				main: '#9b59b6',
				sub: '#be93dc',
			},
			button: {
				selectBg: '#9b59b6',
				defaultBg: '#1c1b22',
				defaultText: '#ddd',
				selectText: '#fff',
				borderColor: '#ddd',
			},
			input: {
				text: '#1e1e23',
				bg: '#f3e8ff',
				subBg: '#2a2933',
				border: '#9b59b6',
			},
			pratyList: {
				bg: '#2a2933',
			},
			defaultText: '#fff',
			grayText: '#7f8c8d',
			validatText: '#2ecc71',
		},
		palette: {
			background: {
				default: '#1c1b22',
				paper: '#2a2933',
			},
			text: {
				primary: '#ffffff',
			},
		},
	}),
};
