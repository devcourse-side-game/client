import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { BOARD_PARTY } from '../../constants/Party';
import PartyFilter from './PartyFilter';
import PartyList from './PartyList';
import { useQueryClient } from '@tanstack/react-query';
import { TFilterOptions, TGetPartiesPayload } from '../../types/Party';
import { useParties } from '../../hooks/useParties';
import { useModal } from '../../hooks/useModal';
import {
	PartyBoardContainer,
	PartyBoardHeaderWrapper,
	PartyButtonWrapper,
} from '../../styles/pages/party/PartyBoard.styles';

function PartyBoard() {
	const queryClient = useQueryClient();
	const [filterOptions, setFilterOptions] = useState<TFilterOptions[]>([]);
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 8,
	});

	const payload: TGetPartiesPayload = {
		filterOptions,
		pagination,
	};

	const { data, isLoading, isFetching, isSuccess, isError, error } = useParties(payload);
	const { openModal } = useModal();

	/* 게시판 데이터 무효화를 통해 파티 목록 갱신*/
	const handleRefreshClick = () => {
		queryClient.invalidateQueries({ queryKey: ['parties'] });
	};
	const handleOpenCreateModal = () => {
		openModal('create', null);
	};

	// 페이지 변경 핸들러
	const handlePageChange = (newPage: number) => {
		setPagination((prev) => ({ ...prev, page: newPage }));
	};

	// 필터 변경 시 페이지 초기화
	const handleFilterChange = (newFilterOptions: TFilterOptions[]) => {
		setFilterOptions(newFilterOptions);
		setPagination((prev) => ({ ...prev, page: 1 })); // 페이지 초기화
	};

	return (
		<PartyBoardContainer>
			<PartyBoardHeaderWrapper>
				<Typography variant='h2'>{BOARD_PARTY.PARTY_BOARD_TITLE}</Typography>
				<Typography variant='h6'>{BOARD_PARTY.PARTY_BOARD_SUBTITLE}</Typography>
			</PartyBoardHeaderWrapper>
			<PartyFilter
				filterOptions={filterOptions}
				setFilterOptions={handleFilterChange}
			></PartyFilter>
			<PartyButtonWrapper>
				<Box sx={{ width: '100px' }}></Box>
				<Button variant='text' onClick={handleRefreshClick}>
					새로운 게시글 불러오기
				</Button>
				<Button variant='contained' onClick={handleOpenCreateModal}>
					파티 생성
				</Button>
			</PartyButtonWrapper>

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
