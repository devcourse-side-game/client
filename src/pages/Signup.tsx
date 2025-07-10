import { Container, styled, Typography } from '@mui/material';
import AuthForm from '../components/auth/AuthForm';
import { FormType } from '../constants/enums';

const AuthTitle = styled(Typography)(({ theme }) => ({
	fontSize: '48px',
	textAlign: 'center',
	color: theme.customColor.title.main,
}));

function Signup() {
	return (
		<Container maxWidth='sm' sx={{ marginTop: '10dvh' }}>
			<AuthTitle
				sx={{
					textAlign: 'center',
				}}
			>
				회원가입
			</AuthTitle>
			<AuthForm formType={FormType.SIGNUP} />
		</Container>
	);
}

export default Signup;
