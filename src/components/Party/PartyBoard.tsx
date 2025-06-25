import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { BOARD_PARTY } from '../../constants/Party';
import PartyFilter from './PartyFilter';
import PartyList from './PartyList';
import { useQueryClient } from '@tanstack/react-query';
import { TFilterOptions } from '../../types/Party';
import { useParties } from '../../hooks/useParties';
import PartyCreateForm from './partyCreate/PartyCreateForm';

function PartyBoard() {
	const queryClient = useQueryClient();
	const [isPartyCreateModalOpen, setIsPartyCreateModalOpen] = useState<boolean>(false);
	const [filterOptions, setFilterOptions] = useState<TFilterOptions[]>([]);
	const { data, isLoading, isFetching, isSuccess, isError, error } = useParties(filterOptions);
	/* 게시판 데이터 무효화를 통해 파티 목록 갱신*/
	const handleRefreshClick = () => {
		queryClient.invalidateQueries({ queryKey: ['parties'] });
	};

	return (
		<div className='BoardParty'>
			<Typography>{BOARD_PARTY.PARTY_BOARD_TITLE}</Typography>
			<Typography>{BOARD_PARTY.PARTY_BOARD_SUBTITLE}</Typography>
			<PartyFilter
				filterOptions={filterOptions}
				setFilterOptions={setFilterOptions}
			></PartyFilter>
			<Button onClick={handleRefreshClick}>새로운 게시글 불러오기</Button>
			<Button
				onClick={() => {
					setIsPartyCreateModalOpen(!isPartyCreateModalOpen);
				}}
			>
				파티 생성
			</Button>
			{isPartyCreateModalOpen ? (
				<PartyCreateForm setIsPartyCreateModalOpen={setIsPartyCreateModalOpen} />
			) : null}
			<PartyList
				data={data}
				isLoading={isLoading}
				isFetching={isFetching}
				isSuccess={isSuccess}
				isError={isError}
				error={error}
			></PartyList>
		</div>
	);
}

export default PartyBoard;
