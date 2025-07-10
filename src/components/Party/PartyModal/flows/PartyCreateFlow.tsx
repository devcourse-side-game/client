import {
	FormControlLabel,
	FormGroup,
	InputAdornment,
	Switch,
	TextField,
	Typography,
	useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import SearchableGameSelect from '../../SearchableGameSelect';
import {
	TPartyFormFlow,
	TUserGameProfile,
	ICreatePartyPayload,
	TCreatePartyValidationFormErrors,
} from '../../../../types/party';
import { useCreateParty } from '../../../../hooks/useParties';
import { TGame } from '../../../../types/game';
import {
	TextButton,
	FormCommonButton,
	FormContainer,
	FormDialogActions,
	FormDialogContent,
	FormDialogTitle,
	FormInputs,
} from '../../../../styles/pages/party/forms/Form.styles';
import craetePratyFormValidation from '../../../../utils/partyValidation';
import UserGameProfileSelect from '../../UserGameProfileSelect';
import { useUser } from '../../../../hooks/useUsers';

type TPartyCreateFormProps = {
	onFlowComplete: () => void;
};

function PartyCreateFlow({ onFlowComplete }: TPartyCreateFormProps) {
	const [formTitle, setFormTitle] = useState<string>('');
	const [optionGame, setOptionGame] = useState<TGame | null>(null);
	const [purposeTag, setPurposeTag] = useState<string>('');
	const [formDescription, setFormDescription] = useState<string>('');
	const [formMaxNum, setFormMaxNum] = useState<number>(4);
	const [accessCode, setAccessCode] = useState<string>('');
	const [isPrivateChecked, setIsPrivateChecked] = useState(false);
	const [gameProfile, setGameProfile] = useState<TUserGameProfile | null>(null);
	const [errors, setErrors] = useState<TCreatePartyValidationFormErrors>({
		title: '',
		gameUsername: '',
		accessCode: '',
		description: '',
		maxParticipants: '',
		gameId: '',
	});
	const theme = useTheme();

	//유저 정보 가져오기
	const { data: user } = useUser();

	// 모달 내 흐름 제어
	const [view, setView] = useState<TPartyFormFlow>('form');
	const { mutate, isPending } = useCreateParty();

	const onFlowFailed = () => {
		setView('form');
	};
	const handleOnCreateClick = () => {
		if (!optionGame) {
			setErrors((prev) => ({ ...prev, gameId: '게임을 선택해주세요.' }));
			return;
		}
		const newParty: ICreatePartyPayload = {
			title: formTitle,
			gameId: optionGame.id,
			purposeTag: purposeTag,
			maxParticipants: formMaxNum,
			description: formDescription ? formDescription : '',
			isPrivate: isPrivateChecked,
			accessCode: accessCode,
			gameUsername: gameProfile?.gameUsername ?? '',
			profileId: gameProfile?.id ?? null,
		};
		const errors = craetePratyFormValidation(newParty);
		setErrors(errors);
		if (
			errors.title ||
			errors.gameId ||
			errors.gameUsername ||
			(errors.accessCode && isPrivateChecked)
		) {
			return;
		}
		mutate(newParty, {
			onSuccess: () => {
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
						<FormInputs
							value={formTitle}
							required
							type='text'
							label='파티 이름'
							error={!!errors.title}
							helperText={errors.title}
							onChange={(e) => setFormTitle(e.target.value)}
							inputProps={{
								maxLength: 100,
							}}
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
								sx={{
									'& .MuiSwitch-switchBase.Mui-checked': {
										color: theme.customColor.button.selectBg, // 체크된 thumb 색
									},
									'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
										backgroundColor: theme.customColor.input.bg, // 체크 시 트랙 색
									},
								}}
								label={isPrivateChecked ? '비공개 파티' : '공개 파티'}
							/>
						</FormGroup>
						{isPrivateChecked ? (
							<FormInputs
								value={accessCode}
								required={isPrivateChecked}
								type='text'
								label='방 비밀번호'
								onChange={(e) => setAccessCode(e.target.value)}
							/>
						) : null}
						<FormInputs
							value={purposeTag}
							type='text'
							label='파티 목적 태그'
							placeholder='ex) 레이드, 랭크게임 등'
							onChange={(e) => setPurposeTag(e.target.value)}
						/>
						<FormInputs
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
						<FormInputs
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
						{user && user.id && !!optionGame ? (
							<UserGameProfileSelect
								userId={user.id}
								gameId={optionGame?.id}
								setGameProfile={setGameProfile}
								validate={errors.gameUsername}
							/>
						) : (
							<></>
						)}
					</FormDialogContent>
					<FormDialogActions>
						<TextButton onClick={onFlowComplete}>취소</TextButton>
						<FormCommonButton
							onClick={handleOnCreateClick}
							variant='contained'
							disabled={isPending}
						>
							{isPending ? '생성 중...' : '파티 생성'}
						</FormCommonButton>
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
						<FormCommonButton onClick={onFlowComplete} variant='contained' autoFocus>
							확인
						</FormCommonButton>
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
						<FormCommonButton onClick={onFlowFailed} variant='contained' autoFocus>
							확인
						</FormCommonButton>
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
						<FormCommonButton onClick={onFlowComplete} variant='contained' autoFocus>
							확인
						</FormCommonButton>
					</FormDialogActions>
				</FormContainer>
			);
	}
}
export default PartyCreateFlow;
