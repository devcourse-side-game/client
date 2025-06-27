import { Container, Grid } from '@mui/material';
// import MyPageComponent from '../components/user/MyPageComponent';
import MyPageNaviComponent from '../components/user/MyPageNaviComponent';
import { Outlet } from 'react-router-dom';

function MyPage() {
	return (
		<Container>
			<Grid
				container
				spacing={1}
				direction='row'
				maxWidth='md'
				sx={{
					marginRight: 'auto',
					marginLeft: 'auto',
					marginTop: '10dvh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'flex-start',
				}}
			>
				<Grid size={3}>
					<MyPageNaviComponent />
				</Grid>
				<Grid size={8}>
					<Outlet />
				</Grid>
			</Grid>
		</Container>
	);
}

export default MyPage;
