import { Container, Typography } from '@mui/material';
import AuthForm from '../components/auth/AuthForm';
import { FormType } from '../constants/enums';

function Signup() {
	return (
		<Container maxWidth='sm' sx={{ marginTop: '10dvh' }}>
			<Typography
				variant='h2'
				component='h2'
				sx={{
					textAlign: 'center',
				}}
			>
				회원가입
			</Typography>
			<AuthForm formType={FormType.SIGNUP} />
		</Container>
	);
}

export default Signup;
