import React, { useEffect, useState } from 'react';
import { useJoinParty, useSelectedPartyDetail } from '../../../../hooks/useParties';
import { TPartyFormFlow, TUserGameProfile } from '../../../../types/party';
import { TextField, Typography } from '@mui/material';
import {
	CancelButton,
	FormCommonButton,
	FormContainer,
	FormDialogActions,
	FormDialogContent,
	FormDialogTitle,
} from '../../../../styles/pages/party/forms/Form.styles';
import UserGameProfileSelect from '../../UserGameProfileSelect';
import { useUser } from '../../../../hooks/useUsers';

type TPartyJoinFlowProps = {
	onFlowComplete: () => void;
	partyId: number;
	isPrivate: boolean;
};

export default function PartyJoinFlow({ onFlowComplete, partyId, isPrivate }: TPartyJoinFlowProps) {
	const { data, isLoading, isError, error } = useSelectedPartyDetail(partyId);
	const [formAccessCode, setFormAccessCode] = useState<string>('');
	const [selectedGameProfile, setSelectedGameProfile] = useState<TUserGameProfile | null>(null);

	const { data: user } = useUser();
	const { mutate: joinParty, isSuccess: isJoinSuccess, isError: isJoinError } = useJoinParty();
	// 모달 내 흐름 제어
	const [view, setView] = useState<TPartyFormFlow>('form');
	useEffect(() => {
		if (isJoinSuccess) {
			setView('success');
		} else if (isJoinError) {
			setView('failed');
		}
	}, [isJoinSuccess, isJoinError, setView]);

	if (isLoading) return <div>파티세부 정보 로딩중...</div>;
	if (isError) return <div> 에러가 발생했습니다 : {error.message} </div>;

	const handleOnJoinClick = () => {
		joinParty({
			partyId: partyId,
			gameUsername: selectedGameProfile?.gameUsername ?? '',
			profileId: selectedGameProfile?.id ?? undefined,
			accessCode: formAccessCode ?? '',
		});
	};

	// userId,
	// gameId,
	// setGameProfile,
	// validate,
	switch (view) {
		case 'form':
			return (
				<FormContainer>
					<FormDialogTitle>파티 참가하기</FormDialogTitle>
					<FormDialogContent>
						<Typography>{`${data?.title}파티에 참가합니다.`}</Typography>
						{isPrivate ? (
							<TextField
								value={formAccessCode}
								onChange={(e) => setFormAccessCode(e.target.value)}
								label='접근 코드'
								placeholder='접근 코드를 입력해주세요'
								required
							/>
						) : null}
						{user && user.id ? (
							<UserGameProfileSelect
								userId={user.id}
								gameId={data?.gameId}
								setGameProfile={setSelectedGameProfile}
								validate={''}
							/>
						) : (
							<Typography>로그인 후 이용해주세요.</Typography>
						)}
					</FormDialogContent>
					<FormDialogActions>
						<CancelButton onClick={onFlowComplete}>취소</CancelButton>
						<FormCommonButton
							onClick={handleOnJoinClick}
							variant='contained'
							disabled={false}
						>
							{'참가'}
						</FormCommonButton>
					</FormDialogActions>
				</FormContainer>
			);
		case 'success':
			return (
				<FormContainer>
					<FormDialogTitle>파티 참가 완료</FormDialogTitle>
					<FormDialogContent>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							{`${selectedGameProfile?.gameUsername}님!!`}
						</Typography>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							{`${data?.title} 파티에 성공적으로 참가했습니다!`}
						</Typography>
					</FormDialogContent>
					<FormDialogActions>
						{/* 확인 버튼을 누르면 전체 흐름이 완료되었음을 부모에게 알립니다. */}
						<FormCommonButton onClick={onFlowComplete} variant='contained' autoFocus>
							확인
						</FormCommonButton>
					</FormDialogActions>
				</FormContainer>
			);
		case 'failed':
			return (
				<FormContainer>
					<FormDialogTitle>파티 참가 실패</FormDialogTitle>
					<FormDialogContent>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							{`${selectedGameProfile?.gameUsername}님!!`}
						</Typography>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							{`${data?.title} 파티에 참가하는데 실패했습니다.`}
						</Typography>
					</FormDialogContent>
					<FormDialogActions>
						{/* 확인 버튼을 누르면 전체 흐름이 완료되었음을 부모에게 알립니다. */}
						<FormCommonButton onClick={onFlowComplete} variant='contained' autoFocus>
							확인
						</FormCommonButton>
					</FormDialogActions>
				</FormContainer>
			);
		default:
			return (
				<FormContainer>
					<FormDialogTitle>파티 참가 실패</FormDialogTitle>
					<FormDialogContent>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							{`${selectedGameProfile?.gameUsername}님!`}
						</Typography>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							{`알 수 없는 이유로 참가하는데 실패했습니다. 다시 시도해주세요.`}
						</Typography>
					</FormDialogContent>
					<FormDialogActions>
						{/* 확인 버튼을 누르면 전체 흐름이 완료되었음을 부모에게 알립니다. */}
						<FormCommonButton onClick={onFlowComplete} variant='contained' autoFocus>
							확인
						</FormCommonButton>
					</FormDialogActions>
				</FormContainer>
			);
	}
}
