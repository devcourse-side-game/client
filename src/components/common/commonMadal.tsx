import { Dialog, DialogActions, DialogContent, DialogContentText, useTheme } from '@mui/material';
import { useDialog } from '../../contexts/AuthModalContext';
import { TextButton, FormCommonButton } from '../../styles/pages/party/forms/Form.styles';

function CommonModal() {
	const { isOpen, message, hide, onConfirm, onCancle } = useDialog();

	const handleConfirm = () => {
		if (onConfirm) onConfirm();

		hide();
	};

	const handleCancle = () => {
		if (onCancle) onCancle();

		hide();
	};

	const theme = useTheme();
	return (
		<div>
			{/* Dialog (모달) 컴포넌트 */}
			<Dialog open={isOpen} onClose={hide}>
				<DialogContent>
					<DialogContentText
						sx={{
							color: theme.customColor.defaultText,
						}}
					>
						{message}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<FormCommonButton onClick={handleConfirm} color='primary'>
						확인
					</FormCommonButton>
					{onCancle ? (
						<TextButton onClick={handleCancle} color='error'>
							취소
						</TextButton>
					) : null}
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default CommonModal;
