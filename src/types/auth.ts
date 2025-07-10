import { Control, FieldErrors } from 'react-hook-form';
import { FormType } from '../constants/enums';

export interface IFormTitleProps {
	title: string;
}
export interface IFormTypeProps {
	formType: FormType;
}

export interface IFormInput {
	error: FieldErrors<IUserFormData>;
	control: Control<IUserFormData>;
	label: string;
	required: string;
	defaultValue?: string;
	inputName: 'email' | 'password' | 'username' | 'passwordCheck';
	inputType?: string;
}

export interface IUserFormData {
	email: string;
	password: string;
	username?: string;
	passwordCheck?: string;
}

export interface IPasswordValidBoxPorps {
	check: boolean;
	content: string;
}
