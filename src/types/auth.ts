import { FormType } from '../constants/enums';

export interface FormTitleProps {
	title: string;
}
export interface FormTypeProps {
	formType: FormType;
}

export interface InputProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
}

// export interface SignData {
// 	email: string;
// 	password: string;
// }

// export interface LoginData {
// 	email: string;
// 	password: string;
// 	username: string;
// }

export interface IUserFormData {
	email: string;
	password: string;
	username?: string;
	passwordCheck?: string;
}

export interface PasswordValidBoxPorps {
	check: boolean;
	content: string;
}
