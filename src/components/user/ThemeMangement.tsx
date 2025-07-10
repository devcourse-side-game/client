import { Box, Button, Container, Divider, Grid, Typography, useTheme } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { ThemeType } from '../../constants/enums';
import { UseThemeContext } from '../../contexts/ThemeContext';
import { useState } from 'react';

function ThemeMangement() {
	const { mode, setThemeMode } = UseThemeContext();
	const [select, setSelect] = useState(mode);

	function changeThemeColor(type: ThemeType) {
		setSelect(type);
		if (mode !== type) {
			setThemeMode(type); // 이 함수가 내부에서 localStorage도 업데이트해줌
		}
	}

	const theme = useTheme();
	return (
		<Container maxWidth='sm' sx={{ p: 2, width: '500px' }}>
			<Box display='flex' alignItems='center' gap={2}>
				<Box>
					<Typography variant='h5'>테마 세팅</Typography>
				</Box>
			</Box>

			<Divider sx={{ my: 2 }} />

			<Grid container spacing={1}>
				<Grid size={4}>
					<Button
						variant='outlined'
						startIcon={<DarkModeIcon />}
						fullWidth
						sx={{
							backgroundColor:
								select == ThemeType.DARK
									? theme.customColor.button.selectBg
									: theme.customColor.button.defaultBg,
							color:
								select == ThemeType.DARK
									? theme.customColor.button.selectText
									: theme.customColor.button.defaultText,
							height: '45px',
							borderColor: theme.customColor.button.borderColor,
						}}
						onClick={() => changeThemeColor(ThemeType.DARK)}
					>
						다크 모드
					</Button>
				</Grid>
				<Grid size={4}>
					<Button
						variant='outlined'
						startIcon={<LightModeIcon />}
						fullWidth
						sx={{
							backgroundColor:
								select == ThemeType.LIGHT
									? theme.customColor.button.selectBg
									: theme.customColor.button.defaultBg,
							color:
								select == ThemeType.LIGHT
									? theme.customColor.button.selectText
									: theme.customColor.button.defaultText,
							height: '45px',
							borderColor: theme.customColor.button.borderColor,
						}}
						onClick={() => changeThemeColor(ThemeType.LIGHT)}
					>
						라이트 모드
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
}

export default ThemeMangement;
