import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { PasswordValidBoxPorps } from '../../types/auth';

function PasswordValidBox({ check, content }: PasswordValidBoxPorps) {
	return (
		<Box display='flex' alignItems='center' gap={1}>
			<CheckIcon color={check ? 'success' : 'disabled'} sx={{ fontSize: 16 }} />
			<Typography color={check ? 'success.main' : 'text.disabled'}>{content}</Typography>
		</Box>
	);
}

export default PasswordValidBox;
