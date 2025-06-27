import { ListItemText, MenuItem } from '@mui/material';
import { IMenuItem } from '../../types/user';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function MenuItemCompoent({ menuTitle, path }: IMenuItem) {
	const navigate = useNavigate();
	const location = useLocation();
	const select = location.pathname === path;

	async function moveComponent() {
		await navigate(path);
	}

	return (
		<MenuItem sx={{ height: '55px' }} selected={select} onClick={moveComponent}>
			<ListItemText>{menuTitle}</ListItemText>
		</MenuItem>
	);
}

export default MenuItemCompoent;
