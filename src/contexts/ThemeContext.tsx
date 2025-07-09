import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeType } from '../constants/enums';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { customThemeMap } from '../theme';
import { Theme } from '@emotion/react';

interface ThemeContextType {
	mode: ThemeType;
	toggleThemeMode: () => void;
	setThemeMode: (type: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>({
	mode: ThemeType.DARK, // 기본값
	toggleThemeMode: () => {},
	setThemeMode: () => {},
});

export function UseThemeContext() {
	const ctx = useContext(ThemeContext);
	console.log('[DEBUG] ThemeContext value:', ctx); // ✅ null이면 감싸지 않은 것
	if (!ctx) {
		console.warn('⚠️ ThemeContext가 적용되지 않았습니다. 기본값으로 처리됩니다.');
		return {
			mode: ThemeType.DARK,
			toggleThemeMode: () => {},
			setThemeMode: () => {},
		};
	}

	return ctx;
}

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
	const [mode, setMode] = useState<ThemeType>(() => {
		const saveTheme = localStorage.getItem('theme');
		return saveTheme == ThemeType.DARK
			? ThemeType.DARK
			: saveTheme == ThemeType.LIGHT
				? ThemeType.LIGHT
				: ThemeType.DARK;
	});

	useEffect(() => {
		localStorage.setItem('theme', mode);
	}, [mode]);

	const toggleThemeMode = () => {
		setMode((prev) => (prev === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT));
	};

	const setThemeMode = (mode: ThemeType) => {
		setMode(mode);
	};

	const theme: Theme = useMemo(() => customThemeMap[mode], [mode]);

	return (
		<ThemeContext.Provider value={{ mode, toggleThemeMode, setThemeMode }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	);
}
