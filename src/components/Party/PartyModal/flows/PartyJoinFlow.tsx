import React, { useState } from 'react';
import { useSelectedPartyDetail } from '../../../../hooks/useParties';
import { TPartyFormFlow } from '../../../../types/Party';
import { Button, TextField, Typography } from '@mui/material';
import {
	FormContainer,
	FormDialogActions,
	FormDialogContent,
	FormDialogTitle,
} from '../../../../styles/pages/party/forms/Form.styles';

type TPartyJoinFlowProps = {
	onFlowComplete: () => void;
	partyId: number;
};

export default function PartyJoinFlow({ onFlowComplete, partyId }: TPartyJoinFlowProps) {
	const { data, isLoading, isError, error } = useSelectedPartyDetail(partyId);
	const [formNickname, setFormNickname] = useState<string>('');

	// 모달 내 흐름 제어
	const [view, setView] = useState<TPartyFormFlow>('form');

	if (isLoading) return <div>파티세부 정보 로딩중...</div>;
	if (isError) return <div> 에러가 발생했습니다 : {error.message} </div>;

	const handleOnJoinClick = () => {
		// 참가 hook 필요
		setView('success');
	};

	if (view === 'success') {
		return (
			<FormContainer>
				<FormDialogTitle>파티 참가 완료</FormDialogTitle>
				<FormDialogContent>
					<Typography sx={{ py: 4, textAlign: 'center' }}>
						{`${formNickname}님!!`}
					</Typography>
					<Typography sx={{ py: 4, textAlign: 'center' }}>
						{`${data?.title} 파티에 성공적으로 참가했습니다!`}
					</Typography>
				</FormDialogContent>
				<FormDialogActions>
					{/* 확인 버튼을 누르면 전체 흐름이 완료되었음을 부모에게 알립니다. */}
					<Button onClick={onFlowComplete} variant='contained' autoFocus>
						확인
					</Button>
				</FormDialogActions>
			</FormContainer>
		);
	}

	return (
		<FormContainer>
			<FormDialogTitle>파티 참가하기</FormDialogTitle>
			<FormDialogContent>
				<Typography>{`${data?.title}파티에 참가합니다.`}</Typography>
				<TextField
					value={formNickname}
					type='text'
					label='인게임 닉네임'
					placeholder='게임에서 사용하는 인게임 닉네임을 입력'
					required
					helperText={!formNickname ? '닉네임을 입력해주세요' : ''}
					error={!formNickname}
					onChange={(e) => setFormNickname(e.target.value)}
				/>
			</FormDialogContent>
			<FormDialogActions>
				<Button onClick={onFlowComplete}>취소</Button>
				<Button onClick={handleOnJoinClick} variant='contained' disabled={false}>
					{'참가'}
				</Button>
			</FormDialogActions>
		</FormContainer>
	);
}
