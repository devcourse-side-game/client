import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { useDialog } from '../../contexts/AuthModalContext';

function CommonModal() {
	const { isOpen, message, hide, onConfirm } = useDialog();

	console.log(isOpen);

	const handleConfirm = () => {
		if (onConfirm) onConfirm();

		hide();
	};

	return (
		<div>
			{/* Dialog (모달) 컴포넌트 */}
			<Dialog open={isOpen} onClose={hide}>
				<DialogContent>
					<DialogContentText>{message}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleConfirm} color='primary'>
						확인
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default CommonModal;
