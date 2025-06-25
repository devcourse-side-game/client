import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
//import CloseIcon from '@mui/icons-material/Close';

type TCommonModalProps = {
	open: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
};

function CommonModal({ open, onClose, title, children }: TCommonModalProps) {
	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
			<DialogTitle sx={{ m: 0, p: 2 }}>
				{title}
				{/* 닫기 버튼 */}
				<IconButton
					aria-label='close'
					onClick={onClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					{/* <CloseIcon /> */}
				</IconButton>
			</DialogTitle>

			<DialogContent dividers>{children}</DialogContent>
		</Dialog>
	);
}

export default CommonModal;
