import { Typography } from '@mui/material';

interface FormTitleProps {
	title: string;
}

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
