import React from 'react';
import { Dialog } from '@mui/material';
import { CommonModalContainer } from '../../../styles/modal/CommonModal.styles';
//import CloseIcon from '@mui/icons-material/Close';

type TCommonModalProps = {
	// 모달이 열리는 조건
	open: boolean;
	// 모달이 닫힐 때 작동할 콜백 함수
	onClose: () => void;
	// 모달 내부에 사용될 컴포넌트
	children: React.ReactNode;
};

function CommonModal({ open, onClose, children }: TCommonModalProps) {
	return (
		<CommonModalContainer>
			<Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
				{children}
			</Dialog>
		</CommonModalContainer>
	);
}

export default CommonModal;
