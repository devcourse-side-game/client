import React, { useState } from 'react';
import { Typography, Chip, Button } from '@mui/material';
import SearchableGameSelect from './SearchableGameSelect';
import { TFilterOptions } from '../../types/Party';
import {
	PartyFilterContainer,
	PartyFilterOptionsWrapper,
	PartyFilterButtonContainer,
	PartyFilterChipWrapper,
} from '../../styles/pages/party/PartyFilter.styles';
import { TGame } from '../../types/Party';

type TPartyFilterProps = {
	filterOptions: TFilterOptions[];
	setFilterOptions: (filterOptions: TFilterOptions[]) => void;
};

function PartyFilter({ filterOptions, setFilterOptions }: TPartyFilterProps) {
	const [optionGame, setOptionGame] = useState<TGame | null>(null);
	const [filterPartyOwnerNicknameText, setFilterPartyOwnerNicknameText] = useState<string>('');
	const [filterPartyTitleText, setFilterPartyTitleText] = useState<string>('');

	const handleFilterChange = () => {
		const newOptions: TFilterOptions[] = [];
		// type을 Enum 또는 상수화 필요
		if (optionGame)
			newOptions.push({ type: 'gameId', value: optionGame.id, label: optionGame.name });
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

	const handleFilterReset = () => {
		setOptionGame(null);
		setFilterPartyOwnerNicknameText('');
		setFilterPartyTitleText('');
		setFilterOptions([]);
	};

	const handleOnChipDelete = (key: string) => {
		const newFilterOption = filterOptions.filter(
			(option) => `${option.label}_${option.type}` !== key
		);
		setFilterOptions(newFilterOption);
	};
	return (
		<PartyFilterContainer>
			<Typography variant='h6'>필터 옵션</Typography>
			<PartyFilterOptionsWrapper direction='row'>
				<SearchableGameSelect setOptionGame={setOptionGame}></SearchableGameSelect>
				{/* <TextField
					variant='outlined'
					value={filterPartyOwnerNicknameText}
					type='Text'
					label='파티장 이름 입력'
					onChange={(e) => setFilterPartyOwnerNicknameText(e.target.value)}
				></TextField>
				<TextField
					variant='outlined'
					value={filterPartyTitleText}
					type='Text'
					label='파티 이름 입력'
					onChange={(e) => setFilterPartyTitleText(e.target.value)}
				></TextField> */}
			</PartyFilterOptionsWrapper>
			<PartyFilterChipWrapper>
				{filterOptions.map((option) =>
					option ? (
						<Chip
							key={`${option.label}_${option.type}`}
							label={option.label}
							onDelete={() => handleOnChipDelete(`${option.label}_${option.type}`)}
						/>
					) : null
				)}
			</PartyFilterChipWrapper>

			<PartyFilterButtonContainer>
				<Button variant='text' onClick={handleFilterReset}>
					필터 초기화
				</Button>
				<Button variant='contained' onClick={handleFilterChange}>
					필터 적용
				</Button>
			</PartyFilterButtonContainer>
		</PartyFilterContainer>
	);
}
export default PartyFilter;
