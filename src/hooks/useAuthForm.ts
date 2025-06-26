import { useForm } from 'react-hook-form';
import { FormTypeProps, IUserFormData } from '../types/auth';
import { EMAIL_REGEX } from '../constants/regex';
import {
	ALREADU_USED_USERNAME,
	EMAIL_VALIDATION_ERROR,
	ENTER_EMAIL,
	ENTER_PASSWORD,
	ENTER_USERNAME,
	INVALID_CREDENTIALS,
	PASSWORD_COMPLEXITY_ERROR,
	PASSWORD_MISMATCH_ERROR,
} from '../constants/error';
import { FormType } from '../constants/enums';
import axios, { AxiosError } from 'axios';
import { validatePassword } from '../utils/passwordValidation';
import { useNavigate } from 'react-router-dom';
// import { loginApi } from '../api/auth';
import { loginSuccess } from '../stores/authSlice';
import { AppDispatch } from '../stores';
import { useDispatch } from 'react-redux';

const dummyUsers = [
	{
		email: 'test@example.com',
		password: 'Test1234!',
		username: 'testuser',
		accessToken: 'accessTokenTest',
	},
	{
		email: 'user@example.com',
		password: 'User1234!',
		username: 'user1',
		accessToken: 'accessTokenTest',
	},
];

export function useAuthForm({ formType }: FormTypeProps) {
	const {
		handleSubmit,
		control,
		watch,
		setError,
		formState: { errors },
		getValues,
	} = useForm<IUserFormData>();

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const onValidate = async (data: IUserFormData) => {
		if (!data.email) {
			setError('email', { message: ENTER_EMAIL });
			return;
		}
		if (!EMAIL_REGEX.test(data.email)) {
			setError('email', { message: EMAIL_VALIDATION_ERROR });
			return;
		}

		if (!data.password) {
			setError('password', { message: ENTER_PASSWORD });
			return;
		}

		// TODO: 로그인 or 회원가입 API 요청
		switch (formType) {
			case FormType.SIGNUP:
				{
					// 유저 닉네임 확인
					if (!data.username) {
						setError('username', { message: ENTER_USERNAME });
						return;
					}

					// 비밀번호 조합 유효성 체크
					const { isLengthValid, isComplexValid } = validatePassword(data.password);
					if (!(isLengthValid && isComplexValid)) {
						setError('passwordCheck', { message: PASSWORD_COMPLEXITY_ERROR });
					}

					// 비밀번호 일치 확인
					if (data.password !== data.passwordCheck) {
						setError('passwordCheck', { message: PASSWORD_MISMATCH_ERROR });
						return;
					}

					// 회원가입 api 호출
					await submitSignup(data);
				}
				break;
			case FormType.LOGIN:
				// 로그인 api 호출
				submitLogin(data);
				break;
		}
	};

	async function submitSignup(user: IUserFormData) {
		try {
			const res = await axios.post('/auth/register', {
				username: user.username,
				email: user.email,
				password: user.password,
			});
			// TODO: 회원가입 성공 후 라우팅 또는 메시지 표시
			console.log('회원가입: ', res.data);
		} catch (error: unknown) {
			const axiosError = error as AxiosError;

			// TODO: 서버에서 온 에러 메시지를 setError로 보여줄 수도 있음
			console.error('회원가입 실패:', error);
			if (axiosError.response) {
				const { status } = axiosError.response;

				switch (status) {
					case 404:
						console.log('회원가입 실패 모달창 오픈');
						break;
					case 409: // 이미 사용중인 닉네임
						setError('username', { message: ALREADU_USED_USERNAME });
						break;
				}
			}
		}
	}

	async function submitLogin(user: IUserFormData) {
		try {
			// const res = await loginApi({
			// 	email: user.email,
			// 	password: user.password,
			// });

			const res = dummyUsers.find(
				(userData) => userData.email === user.email && userData.password === user.password
			);
			console.log(res);

			if (res) {
				const assessToken = res?.accessToken ? res.accessToken : '';
				dispatch(loginSuccess(assessToken));
				navigate('/');
			} else {
				// test
			}
		} catch (error: unknown) {
			const axiosError = error as AxiosError;
			console.error('로그인 실패:', axiosError.response?.data || error);
			if (axiosError.response) {
				const { status } = axiosError.response;

				switch (status) {
					case 401: // 인증 실패
						setError('username', { message: INVALID_CREDENTIALS });
						break;
					case 404:
						console.log('로그인 실패 모달창 오픈');
						break;
				}
			}
		}
	}

	return {
		watch,
		control,
		handleSubmit: handleSubmit(onValidate),
		errors,
		getValues,
		setError,
	};
}
