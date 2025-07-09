import { ListItemText, MenuItem, useTheme } from '@mui/material';
import { IMypageMenuItem } from '../../types/user';
import { useLocation, useNavigate } from 'react-router-dom';

function MenuItemCompoent({ menuTitle, path }: IMypageMenuItem) {
	const navigate = useNavigate();
	const location = useLocation();
	const select = location.pathname === path;
	const theme = useTheme();

	async function moveComponent() {
		await navigate(path);
	}

	return (
		<MenuItem sx={{ height: '55px' }} selected={select} onClick={moveComponent}>
			<ListItemText sx={{ color: theme.customColor.defaultText }}>{menuTitle}</ListItemText>
		</MenuItem>
	);
}

export default MenuItemCompoent;
