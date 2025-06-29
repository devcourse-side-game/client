import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { TextField, Autocomplete, CircularProgress } from '@mui/material';
import { IGame } from '../../types/response';
import { useGameList } from '../../hooks/useGames';
import GameImage from '../../assets/gameImage.png';
type TSearchableGameSelectProps = {
	setOptionGame: Dispatch<SetStateAction<IGame | null>>;
};

function SearchableGameSelect({ setOptionGame }: TSearchableGameSelectProps) {
	// 선택된 게임 객체를 저장하기 위한 state
	const [selectedGame, setSelectedGame] = useState<IGame | null>(null);

	const { data, isLoading, isError, isSuccess } = useGameList({
		limit: 50, // 더 많은 게임을 가져오기 위해 limit 증가
		page: 1,
	});

	const { games }: { games: IGame[] } = isSuccess ? data : { games: [] };

	return (
		<Autocomplete
			// 선택된 값 (제어 컴포넌트)
			value={selectedGame}
			// 사용자가 항목을 선택했을 때 호출되는 함수
			onChange={(event, newValue: IGame | null) => {
				setSelectedGame(newValue);
				setOptionGame(newValue);
			}}
			// 드롭다운에 표시될 전체 옵션 배열
			options={games || []}
			// 각 옵션 객체에서 화면에 표시할 라벨을 추출하는 방법 정의
			getOptionLabel={(option) => option.name}
			renderOption={(props, option) => (
				<li {...props}>
					{option.bannerUrl ? (
						<img
							src={option.bannerUrl}
							alt={option.name}
							style={{ width: 120, height: 60, padding: 10 }}
						/>
					) : (
						<img
							src={GameImage}
							alt='default-img'
							style={{ width: 120, height: 60, padding: 10 }}
						/>
					)}
					{option.name}
				</li>
			)}
			// 화면에 렌더링될 입력창(TextField)의 형태 정의
			renderInput={(params) => (
				<TextField
					{...params}
					label='게임 검색 및 선택'
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<>
								{isLoading ? <CircularProgress color='inherit' size={20} /> : null}
								{params.InputProps.endAdornment}
							</>
						),
					}}
				/>
			)}
			// 로딩 중일 때 옵션 비활성화
			loading={isLoading}
			// API 에러 시 비활성화
			disabled={isError}
			sx={{ width: 300 }}
		/>
	);
}

export default SearchableGameSelect;
