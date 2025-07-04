import React, { useState } from 'react';
import { TPartyFormFlow } from '../../../../types/Party';
import { Box, Button, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useChangePartyLeader } from '../../../../hooks/useParties';

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
	const {
		mutate: changePartyLeader,
		isSuccess,
		isError,
	} = useChangePartyLeader({ partyId, userId });
	const handleOnClick = () => {
		// 리더 변경 api 호출 필요
		changePartyLeader({ partyId, userId });
		if (isSuccess) {
			setView('success');
		} else if (isError) {
			setView('failed');
		}
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
							{`${userName}님으로 리더가 변경됬습니다.`}
						</Typography>
					</DialogContent>
					<DialogActions>
						{/* 확인 버튼을 누르면 전체 흐름이 완료되었음을 부모에게 알립니다. */}
						<Button onClick={onFlowComplete} variant='contained' autoFocus>
							확인
						</Button>
					</DialogActions>
				</>
			);
		case 'failed':
			return (
				<>
					<DialogTitle>파티 리더 교체</DialogTitle>
					<DialogContent>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							{`${userName}님으로 리더를 바꾸는데 실패했습니다.`}
						</Typography>
					</DialogContent>
					<DialogActions>
						{/* 확인 버튼을 누르면 전체 흐름이 완료되었음을 부모에게 알립니다. */}
						<Button onClick={onFlowComplete} variant='contained' autoFocus>
							확인
						</Button>
					</DialogActions>
				</>
			);
	}
}
