import { Button, FormControl, FormHelperText, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { FormType } from '../../constants/enums';

interface FormTypeProps {
	formType: number;
}

function AuthForm({ formType }: FormTypeProps) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordCheck, setPasswordCheck] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [error, setError] = useState(false);

	async function handleSubmit(formType: number) {
		// 이메일 확인
		await isValidEmailAddress();
		if (FormType.SIGNUP == formType) {
			// 비밀번호 정규식
			await isValidPasswordRegex();
			// 비밀번호 재확인
			await confirmPassword();
		}
	}

	async function isValidEmailAddress() {
		if (!email) {
			setErrorMsg('이메일을 입력해주세요.');
			setError(true);
		} else {
			const isValid = await isValidEmailRegex();
			if (!isValid) {
				setError(true);
				setErrorMsg('올바른 이메일 형식을 입력해주세요.');
			} else {
				setError(false);
				setErrorMsg('');
			}
		}
	}

	function isValidEmailRegex() {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	function isValidPasswordRegex() {}

	function confirmPassword() {}

	function confirmUsername() {
		// 닉네임 확인 api 호출
		alert('닉네임 확인 api 호출');
	}

	return (
		<FormControl fullWidth error={error} margin='normal'>
			{FormType.SIGNUP === formType && (
				<Grid container spacing={2}>
					<Grid size={10}>
						<TextField
							label='닉네임'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							aria-describedby='helper-text'
							fullWidth
						/>
					</Grid>
					<Grid size={'grow'}>
						<Button variant='contained' fullWidth onClick={confirmUsername}>
							확인
						</Button>
					</Grid>
				</Grid>
			)}
			<TextField
				label='email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				aria-describedby='helper-text'
			/>
			<TextField
				label='password'
				value={password}
				type='password'
				onChange={(e) => setPassword(e.target.value)}
				aria-describedby='helper-text'
			/>

			{FormType.SIGNUP === formType && (
				<TextField
					label='password 확인'
					value={passwordCheck}
					type='password'
					onChange={(e) => setPasswordCheck(e.target.value)}
					aria-describedby='helper-text'
				/>
			)}

			<FormHelperText id='helper-text'>{errorMsg}</FormHelperText>

			<Button variant='contained' onClick={() => handleSubmit(formType)}>
				로그인
			</Button>
		</FormControl>
	);
}

export default AuthForm;
