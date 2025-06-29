import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { BOARD_PARTY } from '../../constants/Party';
import PartyFilter from './PartyFilter';
import PartyList from './PartyList';
import { useQueryClient } from '@tanstack/react-query';
import { TFilterOptions } from '../../types/Party';
import { useParties } from '../../hooks/useParties';
import { useModal } from '../../hooks/useModal';
import {
	PartyBoardContainer,
	PartyBoardHeader,
	PartyBoardTitle,
	CreatePartyButton,
	PartyButtonContainer,
	PartyRefreshButton,
} from '../../styles/pages/party/PartyBoard.styles';

function PartyBoard() {
	const queryClient = useQueryClient();
	const [filterOptions, setFilterOptions] = useState<TFilterOptions[]>([]);
	const { data, isLoading, isFetching, isSuccess, isError, error } = useParties(filterOptions);
	const { openModal } = useModal();

	/* 게시판 데이터 무효화를 통해 파티 목록 갱신*/
	const handleRefreshClick = () => {
		queryClient.invalidateQueries({ queryKey: ['parties'] });
	};
	const handleOpenCreateModal = () => {
		openModal('create', null);
	};

	return (
		<PartyBoardContainer className='PartyBoardContainer'>
			<PartyBoardHeader>
				<PartyBoardTitle>{BOARD_PARTY.PARTY_BOARD_TITLE}</PartyBoardTitle>
				<Typography>{BOARD_PARTY.PARTY_BOARD_SUBTITLE}</Typography>
			</PartyBoardHeader>
			<PartyFilter
				filterOptions={filterOptions}
				setFilterOptions={setFilterOptions}
			></PartyFilter>
			<PartyButtonContainer>
				<Box sx={{ width: '100px' }}></Box>
				<PartyRefreshButton onClick={handleRefreshClick}>
					새로운 게시글 불러오기
				</PartyRefreshButton>
				<CreatePartyButton onClick={handleOpenCreateModal}>파티 생성</CreatePartyButton>
			</PartyButtonContainer>

			<PartyList
				data={data}
				isLoading={isLoading}
				isFetching={isFetching}
				isSuccess={isSuccess}
				isError={isError}
				error={error}
			></PartyList>
		</PartyBoardContainer>
	);
}

export default PartyBoard;
