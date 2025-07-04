import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { IFormInput } from '../../types/auth';

function FormInput({ error, control, label, required, inputName, inputType = 'text' }: IFormInput) {
	return (
		<Controller
			name={inputName}
			control={control}
			rules={{
				required,
			}}
			render={({ field }) => (
				<TextField
					{...field}
					error={!!error[inputName]}
					label={label}
					type={inputType}
					sx={{ marginBottom: '10px' }}
				/>
			)}
		/>
	);
}

export default FormInput;
