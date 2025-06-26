import React, { useState } from 'react';
import { TPartyFormFlow } from '../../../../types/Party';
import { Box, Button, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

type TPartyJoinFlowProps = {
	onFlowComplete: () => void;
	partyId: number;
	userId: number;
	userName: string;
};

export default function MemberBanFlow({
	onFlowComplete,
	partyId,
	userId,
	userName,
}: TPartyJoinFlowProps) {
	const [view, setView] = useState<TPartyFormFlow>('form');

	const handleOnBanClick = () => {
		// 맴버 밴 api 호출 필요
		setView('success');
	};

	if (view === 'success') {
		return (
			<>
				<DialogTitle>멤버 강퇴</DialogTitle>
				<DialogContent>
					<Typography sx={{ py: 4, textAlign: 'center' }}>
						{`${userName}님을 파티에서 내보냈습니다`}
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

	return (
		<>
			<DialogTitle>멤버 강퇴</DialogTitle>
			<DialogContent>
				<Typography sx={{ py: 4, textAlign: 'center' }}>
					{`${userName}님을 파티에서 내보내시겠습니까?`}
				</Typography>
				<Box>
					<div>내보낼 유저</div>
					<Typography>{`${userName}`}</Typography>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onFlowComplete}>취소</Button>
				<Button onClick={handleOnBanClick} variant='contained' disabled={false}>
					{'내쫒기'}
				</Button>
			</DialogActions>
		</>
	);
}
