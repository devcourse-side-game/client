import React, { Dispatch, SetStateAction, useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { TOptionGame } from '../../types/Party';

// feat gpt
// 이게 훅으로 들어가야 할지 고민중
// 1. 선택 가능한 전체 옵션 데이터
const gameOptions = [
	{ id: 1, title: '로스트아크', category: 'MMORPG' },
	{ id: 2, title: '리그 오브 레전드', category: 'MOBA' },
	{ id: 3, title: '오버워치 2', category: 'FPS' },
	{ id: 4, title: '발로란트', category: 'FPS' },
	{ id: 5, title: '메이플스토리', category: 'MMORPG' },
];

type TSearchableGameSelectProps = {
	setOptionGame: Dispatch<SetStateAction<TOptionGame | null>>;
};

function SearchableGameSelect({ setOptionGame }: TSearchableGameSelectProps) {
	// 2. 선택된 게임 객체를 저장하기 위한 state
	const [selectedGame, setSelectedGame] = useState<TOptionGame | null>(null);

	return (
		<Autocomplete
			// 선택된 값 (제어 컴포넌트)
			value={selectedGame}
			// 사용자가 항목을 선택했을 때 호출되는 함수
			// newValue는 선택된 gameOptions 객체입니다. (예: { id: 1, title: '로스트아크', ... })
			onChange={(event, newValue: TOptionGame | null) => {
				setSelectedGame(newValue);
				setOptionGame(newValue);
			}}
			// 드롭다운에 표시될 전체 옵션 배열
			options={gameOptions}
			// 각 옵션 객체에서 화면에 표시할 라벨을 추출하는 방법 정의
			getOptionLabel={(option) => option.title}
			// 화면에 렌더링될 입력창(TextField)의 형태 정의
			// params는 Autocomplete가 TextField에 전달해야 할 필수 props들을 담고 있습니다.
			renderInput={(params) => <TextField {...params} label='게임 검색 및 선택' />}
			sx={{ width: 300 }}
		/>
	);
}

export default SearchableGameSelect;
