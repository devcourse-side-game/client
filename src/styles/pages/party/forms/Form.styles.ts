import { styled } from '@mui/material/styles';
import {
	Box,
	DialogContent,
	DialogTitle,
	DialogActions,
	Button,
	TextField,
	MenuItem,
} from '@mui/material';

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
	color: theme.customColor.button.selectText,
	marginLeft: 'auto',
}));

export const TextButton = styled(Button)(({ theme }) => ({
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

export const FormInputs = styled(TextField)(({ theme }) => ({
	'& .MuiInputBase-input': {
		color: theme.customColor.input.text,
	},
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme.customColor.input.bg,
		'&.Mui-focused fieldset': {
			borderColor: theme.customColor.input.border,
		},
	},
	'& .MuiInputLabel-root': {
		color: theme.customColor.input.text,
		'&.Mui-focused': {
			color: theme.customColor.input.border,
		},
	},

	// '& .MuiInputBase-input': {
	// 	color: theme.customColor.grayText,
	// },
	// '& .MuiOutlinedInput-root': {
	// 	backgroundColor: theme.customColor.input.subBg,
	// 	'&.Mui-focused fieldset': {
	// 		borderColor: theme.customColor.input.border,
	// 	},
	// },
	// '& .MuiInputLabel-root': {
	// 	color: theme.customColor.grayText,
	// 	'&.Mui-focused': {
	// 		color: theme.customColor.input.border,
	// 	},
	// },
}));

export const MenuItemList = styled(MenuItem)(({ theme }) => ({
	height: '55px',
	color: theme.customColor.defaultText,
	'&:hover': {
		backgroundColor: theme.customColor.input.bg,
		color: theme.customColor.title.main,
	},
	'&.Mui-selected': {
		backgroundColor: theme.customColor.input.bg,
		color: theme.customColor.title.main,
		'&:hover': {
			backgroundColor: theme.customColor.input.bg,
		},
	},
}));
