import { Box, Button, FormControl, FormHelperText, Grid, Link, TextField } from '@mui/material';
import { useMemo } from 'react';
import { FormType } from '../../constants/enums';
import { FormTypeProps } from '../../types/auth';
import { Controller } from 'react-hook-form';
import { useAuthForm } from '../../hooks/useAuthForm';
import {
	ALREADU_USED_USERNAME,
	ENTER_EMAIL,
	ENTER_PASSWORD,
	ENTER_USERNAME,
} from '../../constants/error';
import PasswordValidBox from './PasswordValidBox';
import {
	LOGIN_TITLE,
	PASSWORD_LENGTH_VALID,
	PASSWORD_LETTER_VALID,
	SIGNUP_TITLE,
} from '../../constants/auth';
import { validatePassword } from '../../utils/passwordValidation';
import { AxiosError } from 'axios';
import { nicknameCheckApi } from '../../api/auth';
import { useDialog } from '../../contexts/AuthModalContext';

function AuthForm({ formType }: FormTypeProps) {
	const { control, handleSubmit, errors, watch, getValues, setError, clearErrors } = useAuthForm({
		formType,
	});
	const passwordValue = watch('password');
	const { show } = useDialog();
	const { isLengthValid, isComplexValid } = useMemo(() => {
		return validatePassword(passwordValue);
	}, [passwordValue]);

	const errorMessage =
		errors.email?.message ||
		errors.password?.message ||
		errors.passwordCheck?.message ||
		errors.username?.message ||
		'';

	async function confirmUsername() {
		const usernameValue = getValues('username');
		clearErrors();
		if (!usernameValue) {
			setError('username', { message: ENTER_USERNAME });
		} else {
			try {
				const res = await nicknameCheckApi({
					username: usernameValue,
				});

				console.log('닉네임 중복 확인: ' + res.message);
				show(res.message, () => {
					console.log('사용');
				});
			} catch (error: unknown) {
				const axiosError = error as AxiosError;
				if (axiosError.response) {
					const { status } = axiosError.response;

					switch (status) {
						case 409: // 이미 사용중인 닉네임
							setError('username', { message: ALREADU_USED_USERNAME });
							break;
					}
				}
			}
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
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
						</>
					)}
					{/* TODO :: 추후 email, password 테스트 코드 삭제  */}
					<Controller
						name='email'
						control={control}
						defaultValue='test@mail.com'
						rules={{
							required: ENTER_EMAIL,
						}}
						render={({ field }) => (
							<TextField
								{...field}
								error={!!errors.email}
								label='이메일'
								sx={{ marginBottom: '10px' }}
							/>
						)}
					/>

					{FormType.LOGIN === formType && (
						<Controller
							name='password'
							control={control}
							defaultValue='!1234567'
							rules={{
								required: ENTER_PASSWORD,
								validate: (value) => value.length > 0 || ENTER_PASSWORD,
							}}
							render={({ field }) => (
								<TextField
									{...field}
									error={!!errors.password}
									type='password'
									label='비밀번호'
									sx={{ marginBottom: '10px' }}
								/>
							)}
						/>
					)}

					{FormType.SIGNUP === formType && (
						<>
							<Controller
								name='password'
								control={control}
								defaultValue=''
								rules={{
									required: ENTER_PASSWORD,
									validate: (value) => value.length > 0 || ENTER_PASSWORD,
								}}
								render={({ field }) => (
									<TextField
										{...field}
										error={!!errors.password}
										type='password'
										label='비밀번호'
										sx={{ marginBottom: '10px' }}
									/>
								)}
							/>

							<Controller
								name='passwordCheck'
								control={control}
								defaultValue=''
								rules={{
									required: ENTER_PASSWORD,
								}}
								render={({ field }) => (
									<TextField
										{...field}
										error={!!errors.passwordCheck}
										type='password'
										label='비밀번호 확인'
									/>
								)}
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
