import { Container } from '@mui/material';
import FormTitle from '../components/auth/FormTitle';
import AuthForm from '../components/auth/AuthForm';
import { FormType } from '../constants/enums';

function Signup() {
	return (
		<Container maxWidth='sm' sx={{ marginTop: '10dvh' }}>
			<FormTitle title='회원가입' />
			<AuthForm formType={FormType.SIGNUP} />
		</Container>
	);
}

export default Signup;
