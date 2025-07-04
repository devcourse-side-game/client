import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeType } from '../constants/enums';
import { CssBaseline, ThemeProvider } from '@mui/material';
import themeMap from '../theme';
import { Theme } from '@emotion/react';

interface ThemeContextType {
	mode: ThemeType;
	toggleThemeMode: () => void;
	setThemeMode: (type: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error('useThemeContext must be used within ThemeProvider');
	return ctx;
};

export const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
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

	const theme: Theme = useMemo(() => themeMap[mode], [mode]);

	return (
		<ThemeContext.Provider value={{ mode, toggleThemeMode, setThemeMode }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	);
};
