import { Container, Grid, Link, styled, Typography } from '@mui/material';
import AuthForm from '../components/auth/AuthForm';
import { FormType } from '../constants/enums';

const LoginContainer = styled(Container)(({ theme }) => ({
	marginTop: '10dvh',
}));

const AuthTitle = styled(Typography)(({ theme }) => ({
	fontSize: '48px',
	textAlign: 'center',
	color: theme.customColor.title.main,
}));

function Login() {
	return (
		<LoginContainer maxWidth='sm'>
			<AuthTitle>로그인</AuthTitle>
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
		</LoginContainer>
	);
}

export default Login;
