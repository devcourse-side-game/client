import React, { useEffect, useState } from 'react';
import { useDisbandParty } from '../../../../hooks/useParties';
import { TPartyFormFlow } from '../../../../types/party';
import { Button } from '@mui/material';
import { DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

type TPartyDisbandFlowProps = {
	onFlowComplete: () => void;
	partyId: number;
};

export default function PartyDisbandFlow({ onFlowComplete, partyId }: TPartyDisbandFlowProps) {
	const [view, setView] = useState<TPartyFormFlow>('form');
	const { mutate: disbandParty, isSuccess, isError } = useDisbandParty(partyId);
	const handleOnClick = () => {
		disbandParty(partyId);
	};

	useEffect(() => {
		if (isSuccess) {
			setView('success');
		} else if (isError) {
			setView('failed');
		}
	}, [isSuccess, isError]);

	switch (view) {
		case 'form':
			return (
				<>
					<DialogTitle>파티 해산</DialogTitle>
					<DialogContent>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							{`파티를 해산하시겠습니까?`}
						</Typography>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							{`삭제한 파티는 다시 복구할 수 없습니다.`}
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={onFlowComplete}>취소</Button>
						<Button
							onClick={handleOnClick}
							variant='contained'
							color='error'
							disabled={false}
						>
							{'파티 해산'}
						</Button>
					</DialogActions>
				</>
			);
		case 'success':
			return (
				<>
					<DialogTitle>파티 해산</DialogTitle>
					<DialogContent>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							{`파티가 해산되었습니다.`}
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
					<DialogTitle>파티 해산</DialogTitle>
					<DialogContent>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							{`파티 해산에 실패했습니다. 다시 시도해주세요.`}
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
