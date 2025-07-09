import { Box, Container, Grid } from '@mui/material';
import MyPageNaviComponent from '../components/user/MyPageNaviComponent';
import { Outlet } from 'react-router-dom';

function MyPage() {
	return (
		<Container maxWidth='lg'>
			<Box sx={{ width: '100%' }}>
				<Grid
					container
					spacing={1}
					direction='row'
					sx={{
						width: '100%',
						marginTop: '10dvh',
					}}
				>
					<Grid size={3}>
						<MyPageNaviComponent />
					</Grid>
					<Grid size={8}>
						<Outlet />
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}

export default MyPage;
