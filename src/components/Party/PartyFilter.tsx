import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Stack, Typography, TextField, Button, Chip } from '@mui/material';
import SearchableGameSelect from './SearchableGameSelect';
import { TFilterOptions, TOptionGame } from '../../types/Party';

type TPartyFilterProps = {
	filterOptions: TFilterOptions[];
	setFilterOptions: Dispatch<SetStateAction<TFilterOptions[]>>;
};

function PartyFilter({ filterOptions, setFilterOptions }: TPartyFilterProps) {
	const [optionGame, setOptionGame] = useState<TOptionGame | null>(null);
	const [filterPartyOwnerNicknameText, setFilterPartyOwnerNicknameText] = useState<string>('');
	const [filterPartyTitleText, setFilterPartyTitleText] = useState<string>('');

	const handleFilterChange = () => {
		const newOptions: TFilterOptions[] = [];
		// type을 Enum 또는 상수화 필요
		if (optionGame)
			newOptions.push({ type: 'gameId', value: optionGame.id, label: optionGame.title });
		if (filterPartyOwnerNicknameText)
			newOptions.push({
				type: 'partyOwnerName',
				value: filterPartyOwnerNicknameText,
				label: filterPartyOwnerNicknameText,
			});
		if (filterPartyTitleText)
			newOptions.push({
				type: 'partyTitle',
				value: filterPartyTitleText,
				label: filterPartyTitleText,
			});
		setFilterOptions(newOptions);
	};
	const handleOnChipDelete = (key: string) => {
		const newFilterOption = filterOptions.filter(
			(option) => `${option.label}_${option.type}` !== key
		);
		setFilterOptions(newFilterOption);
	};
	return (
		<Box bgcolor='greenyellow'>
			<Typography>필터 옵션</Typography>
			<Stack direction='row'>
				<SearchableGameSelect setOptionGame={setOptionGame}></SearchableGameSelect>
				<TextField
					value={filterPartyOwnerNicknameText}
					type='Text'
					label='파티장 이름 입력'
					onChange={(e) => setFilterPartyOwnerNicknameText(e.target.value)}
				></TextField>
				<TextField
					value={filterPartyTitleText}
					type='Text'
					label='파티 이름 입력'
					onChange={(e) => setFilterPartyTitleText(e.target.value)}
				></TextField>
			</Stack>
			{filterOptions.map((option) =>
				option ? (
					<Chip
						key={`${option.label}_${option.type}`}
						label={option.label}
						onDelete={() => handleOnChipDelete(`${option.label}_${option.type}`)}
					/>
				) : null
			)}
			<Button onClick={handleFilterChange}>필터 적용</Button>
		</Box>
	);
}
export default PartyFilter;
