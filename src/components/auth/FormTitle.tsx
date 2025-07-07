import { Typography } from '@mui/material';
import { IFormTitleProps } from '../../types/auth';

function FormTitle({ title }: IFormTitleProps) {
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
