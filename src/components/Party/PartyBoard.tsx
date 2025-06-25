import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { BOARD_PARTY } from '../../constants/Party';
import PartyFilter from './PartyFilter';
import PartyList from './PartyList';
import { useQueryClient } from '@tanstack/react-query';
import { TFilterOptions, TModalState } from '../../types/Party';
import { useParties } from '../../hooks/useParties';
import CommonModal from './PartyModal/CommonModal';
import PartyCreateFlow from './PartyModal/partyCreate/PartyCreateFlow';
import PartyJoinFlow from './PartyModal/partyJoin/PartyJoinFlow';

function PartyBoard() {
	const queryClient = useQueryClient();
	const [modalState, setModalState] = useState<TModalState>({ type: '', partyId: undefined });
	const [filterOptions, setFilterOptions] = useState<TFilterOptions[]>([]);
	const { data, isLoading, isFetching, isSuccess, isError, error } = useParties(filterOptions);
	/* 게시판 데이터 무효화를 통해 파티 목록 갱신*/
	const handleRefreshClick = () => {
		queryClient.invalidateQueries({ queryKey: ['parties'] });
	};
	const handleCloseModal = () => {
		setModalState({ type: '', partyId: undefined });
	};
	const handleOpenCreateModal = () => {
		setModalState({ type: 'create' });
	};
	const handleOpenJoinModal = (partyId: number) => {
		console.log(`partyBoard 실행! partyId: ${partyId}`);
		setModalState({ type: 'join', partyId: partyId });
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
			<Button onClick={handleOpenCreateModal}>파티 생성</Button>
			<CommonModal open={modalState.type !== ''} onClose={handleCloseModal} title=''>
				{modalState.type === 'join' && modalState.partyId ? (
					<PartyJoinFlow onFlowComplete={handleCloseModal} partyId={modalState.partyId} />
				) : null}
				{modalState.type === 'create' ? (
					<PartyCreateFlow onFlowComplete={handleCloseModal} />
				) : null}
			</CommonModal>

			<PartyList
				data={data}
				isLoading={isLoading}
				isFetching={isFetching}
				isSuccess={isSuccess}
				isError={isError}
				error={error}
				onJoinClicked={handleOpenJoinModal}
			></PartyList>
		</div>
	);
}

export default PartyBoard;
