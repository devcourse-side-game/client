import { TextField } from '@mui/material';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { IUserFormData } from '../../types/auth';

interface IFormInput {
	error: FieldErrors<IUserFormData>;
	control: Control<IUserFormData, IUserFormData>;
	label: string;
	required: string;
	defaultValue: string;
}

function FormInput({ error, control, label, required, defaultValue }: IFormInput) {
	return (
		<Controller
			name='email'
			control={control}
			defaultValue={defaultValue}
			rules={{
				required: required,
			}}
			render={({ field }) => (
				<TextField
					{...field}
					error={!!error.email}
					label={label}
					sx={{ marginBottom: '10px' }}
				/>
			)}
		/>
	);
}

export default FormInput;
