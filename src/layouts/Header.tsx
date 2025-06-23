import { AppBar, Avatar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header() {
	const [show, setShow] = useState(true);
	const [userCheck, setUserCheck] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		// TODO :: 현재는 유저 로그인 체크 상관없이 로그인, 회원가입 페이지에서는 로그인 버튼을 보여주지 않는다.

		switch (location.pathname) {
			case '/login':
				setShow(false);
				break;
			case '/signup':
				setShow(false);
				break;
			default: 
				setShow(true);
				break;
		}
	}, [location])	

	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} disableGutters>
					<Box sx={{ flexGrow: 1, display: { xs: 'flex' }, alignItems: 'center' }}
					onClick={() => navigate('/')}
					>
						<AdbIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1, cursor: 'pointer' }} />
						<Typography
							variant='h6'
							noWrap
							component='a'
							sx={{
								mr: 2,
								display: { xs: 'none', md: 'flex' },
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '0',
								color: 'inherit',
								textDecoration: 'none',
								cursor: 'pointer'
							}}
						>
							GameParty
						</Typography>
					</Box>
							<Box sx={{ flexGrow: 0 }}>

					{
						userCheck ?
						(
						<IconButton sx={{ p: 0 }} onClick={() => navigate('/mypage')}>
							<Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
						</IconButton>
						): 
						(
							show &&
							(
							<Button variant="contained" color="primary" 
							fullWidth
							onClick={() => navigate('/login')}
							>
								로그인
							</Button>
							)
						)
					}
							</Box>
					
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default Header;
