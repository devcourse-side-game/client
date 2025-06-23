import { Container, Grid, Link } from '@mui/material';
import AuthForm from '../components/auth/AuthForm';
import FormTitle from '../components/auth/FormTitle';
import { FormType } from '../constants/enums';

function Login() {
	return (
		<Container maxWidth='sm' sx={{ marginTop: '10dvh' }}>
			<FormTitle title='로그인' />
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
					<Link href='/' underline='hover'>
						아이디/비밀번호 찾기
					</Link>
				</Grid>

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
