import React, { useState } from 'react';
import { TPartyFormFlow } from '../../../../types/Party';
import { Box, Button, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

type TPartyJoinFlowProps = {
	onFlowComplete: () => void;
	partyId: number;
	userId: number;
	userName: string;
};
export default function LeaderChangeFlow({
	onFlowComplete,
	partyId,
	userId,
	userName,
}: TPartyJoinFlowProps) {
	const [view, setView] = useState<TPartyFormFlow>('form');

	const handleOnClick = () => {
		// 리더 변경 api 호출 필요
		setView('success');
	};

	switch (view) {
		case 'form':
			return (
				<>
					<DialogTitle>파티 리더 교체</DialogTitle>
					<DialogContent>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							{`${userName}님으로 리더를 바꾸시겠습니까?`}
						</Typography>
						<Box>
							<div>이 멤버를 리더로 바꾸시겠습니까?</div>
							<Typography>{`${userName}`}</Typography>
						</Box>
					</DialogContent>
					<DialogActions>
						<Button onClick={onFlowComplete}>취소</Button>
						<Button onClick={handleOnClick} variant='contained' disabled={false}>
							{'리더 교체'}
						</Button>
					</DialogActions>
				</>
			);
		case 'success':
			return (
				<>
					<DialogTitle>파티 리더 교체</DialogTitle>
					<DialogContent>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							{`${userName}님으로 리더를 바꾸시겠습니까?`}
						</Typography>
					</DialogContent>
				</>
			);
		case 'failed':
			return (
				<>
					<DialogTitle>파티 리더 교체</DialogTitle>
					<DialogContent>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							{`${userName}님으로 리더를 바꾸시겠습니까?`}
						</Typography>
					</DialogContent>
				</>
			);
	}
}
