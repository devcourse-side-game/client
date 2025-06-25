import {
	Box,
	Button,
	FormControlLabel,
	FormGroup,
	InputAdornment,
	Switch,
	TextField,
} from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import SearchableGameSelect from '../SearchableGameSelect';
import { TOptionGame, TPartyCreateRequest } from '../../../types/Party';
import { useCreateParty } from '../../../hooks/useParties';

type TPartyCreateFormProps = {
	setIsPartyCreateModalOpen: Dispatch<SetStateAction<boolean>>;
};

function PartyCreateForm({ setIsPartyCreateModalOpen }: TPartyCreateFormProps) {
	const [optionGame, setOptionGame] = useState<TOptionGame | null>(null);
	const [formTitle, setFormTitle] = useState<string>('');
	const [purposeTag, setPurposeTag] = useState<string>('');
	const [formDescription, setFormDescription] = useState<string>('');
	const [formMaxNum, setFormMaxNum] = useState<number>(4);
	const [formOwnerNickname, setFormOwnerNickname] = useState<string>('');
	const [isPrivateChecked, setIsPrivateChecked] = useState(false);

	const { mutate, isPending, isError, error, isSuccess } = useCreateParty();

	const handleOnClick = () => {
		const newParty: TPartyCreateRequest = {
			title: formTitle,
			gameId: optionGame?.id,
			purposeTag: purposeTag,
			maxParticipants: formMaxNum,
			startTime: String(Date.now()),
			endTime: String(Date.now()),
			description: formDescription ? formDescription : '',
			isPrivate: isPrivateChecked,
			accessCode: '1234',
		};
		mutate(newParty, {
			onSuccess: (data) => {
				console.log(data.message);
			},
			onError: (error) => {
				console.log(error.message);
			},
		});
	};
	//const label = { inputProps: { 'aria-label': 'Switch demo' } };
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<Button onClick={() => setIsPartyCreateModalOpen(false)}>닫기</Button>
			<Box>파티 생성하기</Box>
			<Box>
				<div>파티 제목</div>
				<TextField
					value={formTitle}
					type='text'
					label='모집할 파티 제목을 입력하세요'
					onChange={(e) => setFormTitle(e.target.value)}
				/>
			</Box>
			<Box>
				<div>게임 선택</div>
				<SearchableGameSelect setOptionGame={setOptionGame} />
			</Box>
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
			<Box>
				<div>파티 목적</div>
				<TextField
					value={purposeTag}
					type='text'
					label='파티의 목적을 나타낼 태그를 입력하세요'
					onChange={(e) => setPurposeTag(e.target.value)}
				/>
			</Box>
			<Box>
				<div>파티 세부 정보</div>
				<TextField
					value={formDescription}
					type='text'
					multiline
					minRows={1}
					label='파티 모집에 필요한 세부 내용을 입력하세요'
					onChange={(e) => setFormDescription(e.target.value)}
				/>
			</Box>
			<Box>
				<div>최대 인원</div>
				<TextField
					value={formMaxNum}
					type='number'
					label='최대 파티원 수를 정하세요'
					slotProps={{
						input: {
							endAdornment: <InputAdornment position='end'>명</InputAdornment>,
						},
					}}
					inputProps={{ min: 1, max: 16 }}
					onChange={(e) => setFormMaxNum(parseInt(e.target.value))}
				/>
			</Box>
			<Box>
				<div>게임 닉네임</div>
				<TextField
					value={formOwnerNickname}
					type='text'
					label='인게임 닉네임을 입력해주세요'
					onChange={(e) => setFormOwnerNickname(e.target.value)}
				/>
			</Box>
			<Button onClick={handleOnClick}>파티 생성</Button>
		</Box>
	);
}
export default PartyCreateForm;
