import React, { useState } from 'react';
import { useSelectedPartyDetail } from '../../../../hooks/useParties';
import { TLeaderChangeData, TPartyFormFlow } from '../../../../types/Party';
import {
	Box,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from '@mui/material';

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
	const { data, isLoading, isError, error } = useSelectedPartyDetail(partyId);
	const [view, setView] = useState<TPartyFormFlow>('form');
	const [formNickname, setFormNickname] = useState<string>('unknown');

	if (isLoading) return <div>파티세부 정보 로딩중...</div>;
	if (isError) return <div> 에러가 발생했습니다 : {error.message} </div>;

	const handleOnJoinClick = () => {
		// 참가 hook 필요
		setView('success');
	};

	if (view === 'success') {
		return (
			<>
				<DialogTitle>파티 참가 완료</DialogTitle>
				<DialogContent>
					<Typography sx={{ py: 4, textAlign: 'center' }}>
						{`${formNickname}님!!`}
					</Typography>
					<Typography sx={{ py: 4, textAlign: 'center' }}>
						{`${data?.title} 파티에 성공적으로 참가했습니다!`}
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
			<DialogTitle>파티 참가하기</DialogTitle>
			<DialogContent>
				<Typography sx={{ py: 4, textAlign: 'center' }}>
					{`${data?.title}파티에 참가합니다.`}
				</Typography>
				<Box>
					<div>파티 제목</div>
					<TextField
						value={formNickname}
						type='text'
						label='모집할 파티 제목을 입력하세요'
						onChange={(e) => setFormNickname(e.target.value)}
					/>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onFlowComplete}>취소</Button>
				<Button onClick={handleOnJoinClick} variant='contained' disabled={false}>
					{'참가'}
				</Button>
			</DialogActions>
		</>
	);
}
