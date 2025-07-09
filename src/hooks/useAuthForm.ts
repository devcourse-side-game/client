import {
	ALREADU_USED_USERNAME,
	EMAIL_VALIDATION_ERROR,
	ENTER_EMAIL,
	ENTER_PASSWORD,
	ENTER_USERNAME,
	NICKNAME_CONFIRM_REQUIRED,
	PASSWORD_COMPLEXITY_ERROR,
	PASSWORD_MISMATCH_ERROR,
} from '../constants/error';
import { EMAIL_REGEX } from '../constants/regex';
import { useForm } from 'react-hook-form';
import { IFormTypeProps, IUserFormData } from '../types/auth';
import { FormType } from '../constants/enums';
import { validatePassword } from '../utils/passwordValidation';
import { useMemo, useState } from 'react';
import { nicknameCheckApi } from '../api/auth';
import { AxiosError } from 'axios';
import { useDialog } from '../contexts/AuthModalContext';

export function useAuthForm({ formType }: IFormTypeProps) {
	const {
		control,
		handleSubmit,
		setError,
		clearErrors,
		getValues,
		watch,
		formState: { errors },
	} = useForm<IUserFormData>({
		defaultValues: {
			email: '',
			password: '',
			passwordCheck: '',
			username: '',
		},
		mode: 'onChange',
	});
	const { show } = useDialog();

	const [isNicknameConfirmed, setIsNicknameConfirmed] = useState(false);

	const passwordValue = watch('password');
	const { isLengthValid, isComplexValid } = useMemo(() => {
		return validatePassword(passwordValue);
	}, [passwordValue]);

	const usernameValue = watch('username');
	useMemo(() => {
		setIsNicknameConfirmed(false);
	}, [usernameValue]);

	const confirmUsername = async () => {
		const username = getValues('username');
		clearErrors('username');

		if (!username) {
			setError('username', { message: ENTER_USERNAME });
			return false;
		}

		try {
			const res = await nicknameCheckApi({ username });
			setIsNicknameConfirmed(true);

			show(`'${usernameValue}' ${res.message}`, () => {
				console.log('사용');
			});
			return true;
		} catch (error: unknown) {
			const axiosError = error as AxiosError;

			if (axiosError.response) {
				const { status } = axiosError.response;

				switch (status) {
					case 409: // 이미 사용중인 닉네임
						setError('username', { message: ALREADU_USED_USERNAME });
						break;
				}
				setIsNicknameConfirmed(false);
				return false;
			}
		}
	};

	const onValidate = async (data: IUserFormData) => {
		// if (!EMAIL_REGEX.test(data.email)) {
		// 	setError('email', { message: EMAIL_VALIDATION_ERROR });
		// 	return false;
		// }
		if (formType === FormType.SIGNUP) {
			// 유저 닉네임 확인
			if (!data.username) {
				setError('username', { message: ENTER_USERNAME });
				return false;
			}

			if (!isNicknameConfirmed) {
				setError('username', { message: NICKNAME_CONFIRM_REQUIRED });
				return false;
			}

			// 비밀번호 조합 유효성 체크
			const { isLengthValid, isComplexValid } = validatePassword(data.password);
			if (!(isLengthValid && isComplexValid)) {
				setError('passwordCheck', { message: PASSWORD_COMPLEXITY_ERROR });
				return false;
			}

			// 비밀번호 일치 확인
			if (data.password !== data.passwordCheck) {
				setError('passwordCheck', { message: PASSWORD_MISMATCH_ERROR });
				console.log('비밀번호 불일치');
				return false;
			}
		}
		return true;
	};

	return {
		control,
		handleSubmit,
		setError,
		watch,
		errors,
		isLengthValid,
		isComplexValid,
		confirmUsername,
		onValidate,
	};
}
