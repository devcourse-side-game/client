import { styled } from '@mui/material/styles';
import { Box, DialogContent, DialogTitle, DialogActions } from '@mui/material';

export const FormContainer = styled(Box)(({ theme }) => ({
	width: '100%',
	minWidth: '200px',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	gap: '10px',
	padding: '10px',
	borderRadius: '10px',
	border: `1px solid ${theme.palette.divider}`,
}));

export const FormDialogTitle = styled(DialogTitle)(({ theme }) => ({
	width: '100%',
	fontSize: '24px',
	fontWeight: 'bold',
	color: theme.palette.primary.main,
}));

export const FormDialogContent = styled(DialogContent)(({ theme }) => ({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	gap: '10px',
	'& .MuiTextField-root:first-of-type': {
		marginTop: '10px',
	},
}));

export const FormDialogActions = styled(DialogActions)(({ theme }) => ({
	width: '100%',
	display: 'flex',
	justifyContent: 'flex-end',
	gap: '10px',
	padding: '10px',
}));
