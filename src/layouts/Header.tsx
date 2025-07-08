import {
	AppBar,
	Avatar,
	Box,
	Button,
	Container,
	IconButton,
	Toolbar,
	Typography,
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../stores';
import { logout } from '../stores/authSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutApi } from '../api/auth';
import { AxiosError } from 'axios';

function Header() {
	// const [show, setShow] = useState(true);
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch<AppDispatch>();

	const show = !(location.pathname === '/login' || location.pathname === '/signup');

	const handleLogout = async () => {
		try {
			await logoutApi(); // 서버 쿠키 삭제 요청
			await dispatch(logout()); // Redux 상태 & localStorage 정리
		} catch (err) {
			const axiosError = err as AxiosError<Response>;
			console.log(axiosError);
		}
	};

	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} disableGutters>
					<Box
						sx={{ flexGrow: 0, display: { xs: 'flex' }, alignItems: 'center' }}
						onClick={() => navigate('/')}
					>
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
								cursor: 'pointer',
							}}
						>
							GameParty
						</Typography>
					</Box>
					<Box sx={{ flexGrow: 1 }}></Box>
					<Box sx={{ flexGrow: 0 }}>
						{isLoggedIn ? (
							<>
								<IconButton
									sx={{ p: 0, marginRight: '7px' }}
									onClick={() => navigate('/mypage')}
								>
									<Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
								</IconButton>
								<IconButton sx={{ color: '#fff' }} onClick={handleLogout}>
									<LogoutIcon></LogoutIcon>
								</IconButton>
							</>
						) : (
							show && (
								<Button
									variant='contained'
									color='primary'
									fullWidth
									onClick={() => navigate('/login')}
								>
									로그인
								</Button>
							)
						)}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default Header;
