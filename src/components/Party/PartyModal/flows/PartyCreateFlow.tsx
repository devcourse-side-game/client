import {
	Button,
	FormControlLabel,
	FormGroup,
	InputAdornment,
	Switch,
	TextField,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import SearchableGameSelect from '../../SearchableGameSelect';
import {
	TPartyFormFlow,
	TPartyCreateRequest,
	TPartyCreateFormErrors,
} from '../../../../types/Party';
import { useCreateParty } from '../../../../hooks/useParties';
import { TGame } from '../../../../types/Party';
import {
	FormContainer,
	FormDialogActions,
	FormDialogContent,
	FormDialogTitle,
} from '../../../../styles/pages/party/forms/Form.styles';
import { MESSAGE_ERROR } from '../../../../constants/error';
import craetePratyFormValidation from '../../../../utils/partyValidation';

type TPartyCreateFormProps = {
	onFlowComplete: () => void;
};

function PartyCreateFlow({ onFlowComplete }: TPartyCreateFormProps) {
	const [formTitle, setFormTitle] = useState('');
	const [optionGame, setOptionGame] = useState<TGame | null>(null);
	const [purposeTag, setPurposeTag] = useState<string>('');
	const [formDescription, setFormDescription] = useState<string>('');
	const [formMaxNum, setFormMaxNum] = useState<number>(4);
	const [formOwnerNickname, setFormOwnerNickname] = useState<string>('');
	const [accessCode, setAccessCode] = useState<string>('');
	const [isPrivateChecked, setIsPrivateChecked] = useState(false);
	const [errors, setErrors] = useState<TPartyCreateFormErrors>({
		title: '',
		ownerNickname: '',
		accessCode: '',
		description: '',
		maxParticipants: '',
		gameId: '',
	});

	// 모달 내 흐름 제어
	const [view, setView] = useState<TPartyFormFlow>('form');
	const { mutate, isPending } = useCreateParty();

	const handleOnCreateClick = () => {
		const newParty: TPartyCreateRequest = {
			title: formTitle,
			gameId: optionGame?.id,
			purposeTag: purposeTag,
			maxParticipants: formMaxNum,
			description: formDescription ? formDescription : '',
			isPrivate: isPrivateChecked,
			accessCode: accessCode,
			GameUsername: formOwnerNickname,
		};
		const errors = craetePratyFormValidation(newParty);
		setErrors(errors);
		if (errors.title || errors.ownerNickname || errors.accessCode) {
			return;
		}
		mutate(newParty, {
			onSuccess: (data) => {
				console.log(data.message);
				setView('success');
			},
			onError: (error) => {
				alert(`에러: ${error.message}`);
				setView('failed');
			},
		});
	};
	switch (view) {
		case 'form':
			return (
				<FormContainer>
					<FormDialogTitle>새로운 파티 생성</FormDialogTitle>
					<FormDialogContent>
						<TextField
							value={formTitle}
							required
							type='text'
							label='파티 이름'
							error={!!errors.title}
							helperText={errors.title}
							onChange={(e) => setFormTitle(e.target.value)}
						/>
						<SearchableGameSelect
							setOptionGame={setOptionGame}
							validate={errors.gameId}
						/>
						<FormGroup>
							<FormControlLabel
								control={
									<Switch
										checked={isPrivateChecked}
										onChange={() => setIsPrivateChecked(!isPrivateChecked)}
										inputProps={{ 'aria-label': 'Basic switch' }}
									/>
								}
								label={isPrivateChecked ? '비공개 파티' : '공개 파티'}
							/>
						</FormGroup>
						{isPrivateChecked ? (
							<TextField
								value={accessCode}
								required={isPrivateChecked}
								type='text'
								label='방 비밀번호'
								onChange={(e) => setAccessCode(e.target.value)}
							/>
						) : null}
						<TextField
							value={purposeTag}
							type='text'
							label='파티 목적 태그'
							placeholder='ex) 레이드, 랭크게임 등'
							onChange={(e) => setPurposeTag(e.target.value)}
						/>
						<TextField
							value={formDescription}
							multiline
							minRows={1}
							label='파티 정보 입력'
							placeholder='ex) 파티 목적, 파티 규칙 등'
							inputProps={{
								pattern: '.*',
							}}
							onChange={(e) => setFormDescription(e.target.value)}
						/>
						<TextField
							value={formMaxNum}
							type='number'
							label='파티 인원 수'
							slotProps={{
								input: {
									endAdornment: (
										<InputAdornment position='end'>명</InputAdornment>
									),
								},
							}}
							inputProps={{ min: 1, max: 16 }}
							onChange={(e) => setFormMaxNum(parseInt(e.target.value))}
						/>
						{/* 변경 필요 : 파티장의 유저프로필 선택 or 닉네임 입력 중 하나 선택 */}
						<TextField
							value={formOwnerNickname}
							type='text'
							label='인게임 닉네임'
							placeholder='파티 주최자 닉네임'
							onChange={(e) => setFormOwnerNickname(e.target.value)}
						/>
					</FormDialogContent>
					<FormDialogActions>
						<Button onClick={onFlowComplete}>취소</Button>
						<Button
							onClick={handleOnCreateClick}
							variant='contained'
							disabled={isPending}
						>
							{isPending ? '생성 중...' : '파티 생성'}
						</Button>
					</FormDialogActions>
				</FormContainer>
			);
		case 'success':
			return (
				<FormContainer>
					<FormDialogTitle>성공</FormDialogTitle>
					<FormDialogContent>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							파티가 성공적으로 생성되었습니다!
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
		case 'failed':
			return (
				<FormContainer>
					<FormDialogTitle>실패</FormDialogTitle>
					<FormDialogContent>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							파티 생성에 실패했습니다.
						</Typography>
					</FormDialogContent>
					<FormDialogActions>
						<Button onClick={onFlowComplete} variant='contained' autoFocus>
							확인
						</Button>
					</FormDialogActions>
				</FormContainer>
			);
		default:
			return (
				<FormContainer>
					<FormDialogTitle>에러</FormDialogTitle>
					<FormDialogContent>
						<Typography sx={{ py: 4, textAlign: 'center' }}>
							알 수 없는 에러가 발생했습니다.
						</Typography>
					</FormDialogContent>
					<FormDialogActions>
						<Button onClick={onFlowComplete} variant='contained' autoFocus>
							확인
						</Button>
					</FormDialogActions>
				</FormContainer>
			);
	}
}
export default PartyCreateFlow;
