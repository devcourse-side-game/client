import React, { useEffect, useState } from 'react';
import { TPartyFormFlow } from '../../../../types/party';
import { Box, Button, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useChangePartyLeader } from '../../../../hooks/useParties';
import { FormCommonButton, TextButton } from '../../../../styles/pages/party/forms/Form.styles';

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
	useEffect(() => {
		if (isSuccess) {
			setView('success');
		} else if (isError) {
			setView('failed');
		}
	}, [isSuccess, isError]);
	const handleOnClick = () => {
		changePartyLeader({ partyId, userId });
	};

	switch (view) {
		case 'form':
			return (
				<>
					<DialogTitle>파티 리더 교체</DialogTitle>
					<DialogContent sx={{ paddingBottom: 0 }}>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							<span style={{ fontWeight: 'bold' }}>{userName}</span>님으로 리더를
							바꾸시겠습니까?
						</Typography>
						<Box>
							<div>선택 멤버</div>
							<Typography
								sx={{ fontWeight: 'bold', fontSize: '18px' }}
							>{`${userName}`}</Typography>
						</Box>
					</DialogContent>
					<DialogActions>
						<TextButton onClick={onFlowComplete}>취소</TextButton>
						<FormCommonButton
							onClick={handleOnClick}
							variant='contained'
							disabled={false}
						>
							{'리더 교체'}
						</FormCommonButton>
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
						<FormCommonButton onClick={onFlowComplete} variant='contained' autoFocus>
							확인
						</FormCommonButton>
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
						<FormCommonButton onClick={onFlowComplete} variant='contained' autoFocus>
							확인
						</FormCommonButton>
					</DialogActions>
				</>
			);
	}
}
