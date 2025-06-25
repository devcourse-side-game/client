import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';

function CommonModal() {
	const [open, setOpen] = useState(true);

	// 모달 닫기
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div>
			{/* Dialog (모달) 컴포넌트 */}
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>My Modal</DialogTitle>
				<DialogContent>
					<p>This is a simple modal example using MUI.</p>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Close
					</Button>
					<Button onClick={handleClose} color='primary'>
						Agree
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default CommonModal;
