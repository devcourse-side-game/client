import React, { Dispatch, SetStateAction, useState } from 'react';
import { TextField, Autocomplete, CircularProgress, Box, Typography } from '@mui/material';
import { TGame } from '../../types/game';
import { useGameList } from '../../hooks/useGames';
import GameImage from '../../assets/gameImage.png';

type TSearchableGameSelectProps = {
	setOptionGame: Dispatch<SetStateAction<TGame | null>>;
	validate?: string;
};

function SearchableGameSelect({ setOptionGame, validate }: TSearchableGameSelectProps) {
	// 선택된 게임 객체를 저장하기 위한 state
	const [selectedGame, setSelectedGame] = useState<TGame | null>(null);
	const [searchValue, setSearchValue] = useState('');
	const { data, isLoading, isError, isSuccess } = useGameList({
		limit: 50, // 더 많은 게임을 가져오기 위해 limit 증가
		page: 1,
		search: searchValue,
	});

	const games = isSuccess ? data : [];

	return (
		<Autocomplete<TGame>
			// 선택된 값 (제어 컴포넌트)
			value={selectedGame}
			// 사용자가 항목을 선택했을 때 호출되는 함수
			onChange={(event, newValue) => {
				setSelectedGame(newValue);
				setOptionGame(newValue);
			}}
			// 드롭다운에 표시될 전체 옵션 배열
			options={games || []}
			// 각 옵션 객체에서 화면에 표시할 라벨을 추출하는 방법 정의
			getOptionLabel={(option) => option.name}
			// key prop을 명시적으로 제공
			getOptionKey={(option) => option.id.toString()}
			renderOption={(props, option) => (
				<Box component='li' {...props} key={option.id}>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
						<img
							src={option.bannerUrl || GameImage}
							alt={option.name}
							loading='lazy'
							onError={(e) => {
								e.currentTarget.src = GameImage;
							}}
							style={{
								width: 120,
								height: 60,
								objectFit: 'cover',
								borderRadius: 4,
							}}
						/>
						<Typography variant='body1'>{option.name}</Typography>
					</Box>
				</Box>
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
					error={!!validate}
					helperText={validate}
				/>
			)}
			onInputChange={(event, newInputValue) => {
				setSearchValue(newInputValue);
			}}
			// 로딩 중일 때 옵션 비활성화
			loading={isLoading}
			// API 에러 시 비활성화
			disabled={isError}
			sx={{ width: 300 }}
		/>
	);
}

export default SearchableGameSelect;
