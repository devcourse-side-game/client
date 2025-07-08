import React, { useEffect, useState } from 'react';
import { TPartyFormFlow } from '../../../../types/party';
import { useCompleteParty } from '../../../../hooks/useParties';
import { Button } from '@mui/material';
import { DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

type TPartyCompleteFlowProps = {
	onFlowComplete: () => void;
	partyId: number;
};

export default function PartyCompleteFlow({ onFlowComplete, partyId }: TPartyCompleteFlowProps) {
	const [view, setView] = useState<TPartyFormFlow>('form');
	const { mutate: completeParty, isSuccess, isError } = useCompleteParty(partyId);

	useEffect(() => {
		if (isSuccess) {
			setView('success');
		} else if (isError) {
			setView('failed');
		}
	}, [isSuccess, isError]);
	const handleOnClick = () => {
		completeParty(partyId);
	};

	switch (view) {
		case 'form':
			return (
				<>
					<DialogTitle>파티 모집 완료</DialogTitle>
					<DialogContent>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							{`파티 모집을 완료하시겠습니까?`}
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={onFlowComplete}>취소</Button>
						<Button onClick={handleOnClick} variant='contained' disabled={false}>
							{'모집 완료'}
						</Button>
					</DialogActions>
				</>
			);
		case 'success':
			return (
				<>
					<DialogTitle>파티 모집 완료</DialogTitle>
					<DialogContent>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							{`파티 모집이 완료되었습니다.`}
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
					<DialogTitle>파티 모집 완료</DialogTitle>
					<DialogContent>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							{`파티 모집 완료에 실패했습니다. 다시 시도해주세요.`}
						</Typography>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							증상이 지속되면 관리자에게 문의해주세요.
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
