import { ListItemText, useTheme } from '@mui/material';
import { IMypageMenuItem } from '../../types/user';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuItemList } from '../../styles/pages/party/forms/Form.styles';

function MenuItemCompoent({ menuTitle, path }: IMypageMenuItem) {
	const navigate = useNavigate();
	const location = useLocation();
	const select = location.pathname === path;

	async function moveComponent() {
		await navigate(path);
	}
	return (
		<MenuItemList selected={select} onClick={moveComponent}>
			<ListItemText>{menuTitle}</ListItemText>
		</MenuItemList>
	);
}

export default MenuItemCompoent;
