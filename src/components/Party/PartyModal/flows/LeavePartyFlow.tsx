import { useEffect, useState } from 'react';
import { useLeaveParty } from '../../../../hooks/useParties';
import { TPartyFormFlow } from '../../../../types/party';
import { DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
type TLeavePartyFlowData = {
	onFlowComplete: () => void;
	partyId: number;
	partyTitle: string;
};

export default function LeavePartyFlow({
	onFlowComplete,
	partyId,
	partyTitle,
}: TLeavePartyFlowData) {
	const { mutate: leaveParty, isSuccess, isError } = useLeaveParty(partyId); // 파티 아이디 받아오기
	const [view, setView] = useState<TPartyFormFlow>('form');

	useEffect(() => {
		if (isSuccess) {
			setView('success');
		} else if (isError) {
			setView('failed');
		}
	}, [isSuccess, isError]);
	const handleOnLeaveClick = () => {
		leaveParty(partyId);
	};
	switch (view) {
		case 'form':
			return (
				<>
					<DialogTitle>파티 나가기</DialogTitle>
					<DialogContent>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							{`'${partyTitle}' 파티에서 나가시겠습니까?`}
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={onFlowComplete}>취소</Button>
						<Button onClick={handleOnLeaveClick} variant='contained' disabled={false}>
							{'나가기'}
						</Button>
					</DialogActions>
				</>
			);
		case 'success':
			return (
				<>
					<DialogTitle>파티 나가기</DialogTitle>
					<DialogContent>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							{`'${partyTitle}' 파티에서 나가셨습니다`}
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
					<DialogTitle>파티 나가기</DialogTitle>
					<DialogContent>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							{`'${partyTitle}' 파티에서 나가는데 실패했습니다`}
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
		default:
			return (
				<>
					<DialogTitle>파티 나가기</DialogTitle>
					<DialogContent>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							{`알 수 없는 이유로 파티에서 나가는데 실패했습니다.`}
						</Typography>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							{`반복될 경우 관리자에게 문의해주세요.`}
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
