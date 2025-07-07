import { Box, Button, FormControl, FormHelperText, Grid, Link, TextField } from '@mui/material';
import { FormType } from '../../constants/enums';
import { IFormTypeProps, IUserFormData } from '../../types/auth';
import { Controller } from 'react-hook-form';
import { useAuthForm } from '../../hooks/useAuthForm';
import {
	ALREADU_USED_USERNAME,
	ENTER_EMAIL,
	ENTER_PASSWORD,
	ENTER_USERNAME,
	ErrorCode,
	NOT_FOUND_USER,
	PASSWORD_MISMATCH_ERROR,
} from '../../constants/error';
import PasswordValidBox from './PasswordValidBox';
import {
	LOGIN_TITLE,
	PASSWORD_LENGTH_VALID,
	PASSWORD_LETTER_VALID,
	SIGNUP_TITLE,
} from '../../constants/auth';
import { AxiosError } from 'axios';
import { loginApi, signupApi } from '../../api/auth';
import { useDialog } from '../../contexts/AuthModalContext';
import FormInput from './FormInput';
import { loginSuccess } from '../../stores/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../stores';
import { Response } from '../../types/response';

function AuthForm({ formType }: IFormTypeProps) {
	const {
		control,
		handleSubmit,
		errors,
		setError,
		confirmUsername,
		isLengthValid,
		isComplexValid,
		onValidate,
	} = useAuthForm({
		formType,
	});
	const { show } = useDialog();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const errorMessage =
		errors.email?.message ||
		errors.password?.message ||
		errors.passwordCheck?.message ||
		errors.username?.message ||
		'';

	async function onSubmit(data: IUserFormData) {
		const valied = await onValidate(data);
		if (valied) {
			switch (formType) {
				case FormType.SIGNUP:
					submitSignup({
						username: data.username,
						email: data.email,
						password: data.password,
					});
					break;
				case FormType.LOGIN:
					submitLogin({
						email: data.email,
						password: data.password,
					});
					break;
			}
		}
	}

	async function submitSignup(user: IUserFormData) {
		try {
			console.log('호출 :: submitSignup');
			const res = await signupApi({
				username: user.username,
				email: user.email,
				password: user.password,
			});
			console.log(res);
			show('회원가입이 완료되었습니다.', () => {
				submitLogin({
					email: user.email,
					password: user.password,
				});
			});
		} catch (err: unknown) {
			const axiosError = err as AxiosError<Response>;
			const response = axiosError.response?.data;
			console.log(err);
			switch (response?.errorCode) {
				case ErrorCode.DATABASE_ERROR:
					show(response.message);
					break;
				case ErrorCode.USER_ALREADY_EXISTS:
					setError('username', { message: ALREADU_USED_USERNAME });
					break;
				case ErrorCode.REPASSWORD_MISMATCH:
					setError('passwordCheck', { message: PASSWORD_MISMATCH_ERROR });
					break;
			}
		}
	}

	async function submitLogin(user: IUserFormData) {
		try {
			const res = await loginApi({
				email: user.email,
				password: user.password,
			});
			const accessToken = res?.accessToken ? res.accessToken : '';
			dispatch(loginSuccess(accessToken));
			navigate('/');
		} catch (err: unknown) {
			const axiosError = err as AxiosError<Response>;
			const response = axiosError.response?.data;
			console.log(axiosError);
			switch (response?.errorCode) {
				case ErrorCode.DATABASE_ERROR:
					show(response.message);
					break;
				case ErrorCode.UNAUTHORIZED:
					show(response.message);
					break;
				case ErrorCode.USER_NOT_FOUND:
					setError('email', { message: NOT_FOUND_USER });
					break;
				case ErrorCode.INVALID_PASSWORD:
					setError('password', { message: PASSWORD_MISMATCH_ERROR });
					break;
			}
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormControl fullWidth error={errorMessage !== ''} margin='normal'>
					{FormType.SIGNUP === formType && (
						<>
							<Controller
								name='username'
								control={control}
								defaultValue=''
								rules={{
									required: ENTER_USERNAME,
								}}
								render={({ field }) => (
									<Grid container spacing={2} sx={{ marginBottom: '10px' }}>
										<Grid size={10}>
											<TextField
												{...field}
												inputRef={field.ref}
												error={!!errors.username}
												fullWidth
												label='닉네임'
											/>
										</Grid>
										<Grid size={'grow'} sx={{ height: '100%' }}>
											<Button
												variant='contained'
												fullWidth
												onClick={confirmUsername}
												sx={{ height: '55px' }}
											>
												확인
											</Button>
										</Grid>
									</Grid>
								)}
							/>
							<FormInput
								inputName='email'
								error={errors}
								control={control}
								defaultValue=''
								label='이메일'
								required={ENTER_EMAIL}
							/>

							<FormInput
								inputName='password'
								inputType='password'
								error={errors}
								control={control}
								defaultValue=''
								label='비밀번호'
								required={ENTER_PASSWORD}
							/>

							<FormInput
								inputName='passwordCheck'
								inputType='password'
								error={errors}
								control={control}
								defaultValue=''
								label='비밀번호 확인'
								required={ENTER_PASSWORD}
							/>

							<Box>
								<PasswordValidBox
									check={isLengthValid}
									content={PASSWORD_LENGTH_VALID}
								/>
								<PasswordValidBox
									check={isComplexValid}
									content={PASSWORD_LETTER_VALID}
								/>
							</Box>
						</>
					)}

					{FormType.LOGIN === formType && (
						<>
							<FormInput
								inputName='email'
								error={errors}
								control={control}
								defaultValue='test@mail.com'
								label='이메일'
								required={ENTER_EMAIL}
							/>
							<FormInput
								inputName='password'
								inputType='password'
								error={errors}
								control={control}
								defaultValue='!1234567'
								label='비밀번호'
								required={ENTER_PASSWORD}
							/>
						</>
					)}

					<FormHelperText
						id='helper-text'
						error={Boolean(errorMessage)}
						sx={{
							marginBottom: '10px',
						}}
					>
						{errorMessage}
					</FormHelperText>

					<Button variant='contained' type='submit'>
						{formType === FormType.LOGIN ? LOGIN_TITLE : SIGNUP_TITLE}
					</Button>
				</FormControl>
			</form>
			{FormType.SIGNUP === formType && (
				<Link sx={{ display: 'flex', justifyContent: 'center' }} href='/login'>
					이미 계정이 있으신가요? 로그인하러 가기
				</Link>
			)}
		</>
	);
}

export default AuthForm;
