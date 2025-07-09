import { Container, Grid, Link, Typography } from '@mui/material';
import AuthForm from '../components/auth/AuthForm';
import { FormType } from '../constants/enums';

function Login() {
	return (
		<Container maxWidth='sm' sx={{ marginTop: '10dvh' }}>
			<Typography
				variant='h2'
				component='h2'
				sx={{
					textAlign: 'center',
				}}
			>
				로그인
			</Typography>
			<AuthForm formType={FormType.LOGIN} />
			<Grid
				container
				spacing={4}
				direction='row'
				sx={{
					justifyContent: 'center',
					alignItems: 'center',
					textAlign: 'center',
					marginTop: '20px',
				}}
			>
				<Grid size={{ xs: 6, md: 6 }}>
					<Link href='/signup' underline='hover'>
						회원가입
					</Link>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Login;
