import React, { useState } from 'react';
import { Typography, Chip, Button } from '@mui/material';
import SearchableGameSelect from './SearchableGameSelect';
import { TFilterOption } from '../../types/party';
import {
	PartyFilterContainer,
	PartyFilterOptionsWrapper,
	PartyFilterButtonContainer,
	PartyFilterChipWrapper,
} from '../../styles/pages/party/PartyFilter.styles';
import { TGame } from '../../types/game';

type TPartyFilterProps = {
	filterOptions: TFilterOption[];
	setFilterOptions: (filterOptions: TFilterOption[]) => void;
};

function PartyFilter({ filterOptions, setFilterOptions }: TPartyFilterProps) {
	const [optionGame, setOptionGame] = useState<TGame | null>(null);
	const [filterPartyOwnerNicknameText, setFilterPartyOwnerNicknameText] = useState<string>('');
	const [filterPartyTitleText, setFilterPartyTitleText] = useState<string>('');

	const handleFilterChange = () => {
		const newOptions: TFilterOption[] = [];
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
