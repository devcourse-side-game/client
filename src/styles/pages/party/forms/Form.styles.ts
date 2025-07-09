import { styled } from '@mui/material/styles';
import { Box, DialogContent, DialogTitle, DialogActions, Button } from '@mui/material';

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
	color: theme.customColor.title.main,
}));

export const FormCommonButton = styled(Button)(({ theme }) => ({
	backgroundColor: theme.customColor.button.selectBg,
}));

export const CancelButton = styled(Button)(({ theme }) => ({
	color: theme.customColor.button.selectBg,
}));

export const FormDialogContent = styled(DialogContent)(({ theme }) => ({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing(1),
	'& .MuiTextField-root:first-of-type': {
		marginTop: '10px',
	},
}));

export const FormDialogActions = styled(DialogActions)(({ theme }) => ({
	width: '100%',
	display: 'flex',
	justifyContent: 'flex-end',
	gap: theme.spacing(1),
	padding: '10px',
}));
