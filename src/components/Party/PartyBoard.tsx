import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { BOARD_PARTY } from '../../constants/Party';
import PartyFilter from './PartyFilter';
import PartyList from './PartyList';
import { useQueryClient } from '@tanstack/react-query';
import { TFilterOptions, TGetPartiesPayload } from '../../types/Party';
import { useInfiniteParties } from '../../hooks/useParties';
import { useModal } from '../../hooks/useModal';
import {
	PartyBoardContainer,
	PartyBoardHeaderWrapper,
	PartyButtonWrapper,
	InfiniteScrollContainer,
} from '../../styles/pages/party/PartyBoard.styles';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { useNavigate } from 'react-router-dom';

const LIMIT = 8;
function PartyBoard() {
	const queryClient = useQueryClient();
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
	const [filterOptions, setFilterOptions] = useState<TFilterOptions[]>([]);
	const [pagination, setPagination] = useState({
		page: 1,
		limit: LIMIT,
	});

	const payload: TGetPartiesPayload = {
		filterOptions,
		pagination,
	};
	const {
		data,
		fetchNextPage,
		isLoading,
		isError,
		isSuccess,
		hasNextPage,
		isFetchingNextPage,
		error,
	} = useInfiniteParties(payload);
	// 모달 컴포넌트 사용
	const { openModal } = useModal();
	//네비게이션 사용
	const navigate = useNavigate();

	/* 무한 스크롤 처리 */
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const { inView, ref: viewRef } = useInView({
		root: scrollContainerRef.current,
		threshold: 0.5,
	});
	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	/* 게시판 데이터 무효화를 통해 파티 목록 갱신*/
	const handleRefreshClick = () => {
		queryClient.invalidateQueries({ queryKey: ['parties'] });
	};
	const handleOpenCreateModal = () => {
		if (isLoggedIn) {
			openModal('create', null);
		} else {
			navigate('/login');
		}
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

			<InfiniteScrollContainer ref={scrollContainerRef}>
				<PartyList
					data={data}
					isLoading={isLoading}
					isFetching={isFetchingNextPage}
					isSuccess={isSuccess}
					isError={isError}
					error={error}
					ref={viewRef}
					hasNextPage={hasNextPage}
				></PartyList>
			</InfiniteScrollContainer>
		</PartyBoardContainer>
	);
}

export default PartyBoard;
