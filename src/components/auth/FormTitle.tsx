import { Typography } from '@mui/material';
import { FormTitleProps } from '../../types/auth';

function FormTitle({ title }: FormTitleProps) {
	return (
		<Typography
			variant='h2'
			component='h2'
			sx={{
				textAlign: 'center',
			}}
		>
			{title}
		</Typography>
	);
}

export default FormTitle;
