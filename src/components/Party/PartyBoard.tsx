import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { BOARD_PARTY } from '../../constants/Party';
import PartyFilter from './PartyFilter';
import PartyList from './PartyList';
import { useQueryClient } from '@tanstack/react-query';
import { TFilterOptions, TModalPayloadKeys, TModalState } from '../../types/Party';
import { useParties } from '../../hooks/useParties';
import CommonModal from './PartyModal/CommonModal';
import PartyCreateFlow from './PartyModal/flows/PartyCreateFlow';
import PartyJoinFlow from './PartyModal/flows/PartyJoinFlow';
import LeaderChangeFlow from './PartyModal/flows/LeaderChangeFlow';
import MemberBanFlow from './PartyModal/flows/MemberBanFlow';

function PartyBoard() {
	const queryClient = useQueryClient();
	const [modalState, setModalState] = useState<TModalState>({ type: '' });
	const [filterOptions, setFilterOptions] = useState<TFilterOptions[]>([]);
	const { data, isLoading, isFetching, isSuccess, isError, error } = useParties(filterOptions);
	/* 게시판 데이터 무효화를 통해 파티 목록 갱신*/
	const handleRefreshClick = () => {
		queryClient.invalidateQueries({ queryKey: ['parties'] });
	};
	const handleCloseModal = () => {
		setModalState({ type: '' });
	};
	const handleOpenCreateModal = () => {
		setModalState({ type: 'create' });
	};
	const handleOpenModal = (state: TModalState) => {
		setModalState(state);
	};
	const renderModalContent = () => {
		switch (modalState.type) {
			case 'create':
				return <PartyCreateFlow onFlowComplete={handleCloseModal} />;
			case 'join':
				if (modalState.payload.partyId !== undefined)
					return (
						<PartyJoinFlow
							onFlowComplete={handleCloseModal}
							partyId={modalState.payload.partyId}
						/>
					);
				else return null;
			case 'leaderChange':
				if (
					modalState.payload.partyId !== undefined &&
					modalState.payload.userId !== undefined &&
					modalState.payload.userName !== undefined
				)
					return (
						<LeaderChangeFlow
							onFlowComplete={handleCloseModal}
							partyId={modalState.payload.partyId}
							userId={modalState.payload.userId}
							userName={modalState.payload.userName}
						/>
					);
				else return null;
			case 'memberBan':
				if (
					modalState.payload.partyId !== undefined &&
					modalState.payload.userId !== undefined &&
					modalState.payload.userName !== undefined
				)
					return (
						<MemberBanFlow
							onFlowComplete={handleCloseModal}
							partyId={modalState.payload.partyId}
							userId={modalState.payload.userId}
							userName={modalState.payload.userName}
						/>
					);
				else return null;
			case 'memberLike':
				if (
					modalState.payload.partyId !== undefined &&
					modalState.payload.userId !== undefined &&
					modalState.payload.userName !== undefined
				)
					return <PartyCreateFlow onFlowComplete={handleCloseModal} />;
				else return null;
		}
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
			<CommonModal open={modalState.type !== ''} onClose={handleCloseModal}>
				{renderModalContent()}
			</CommonModal>

			<PartyList
				data={data}
				isLoading={isLoading}
				isFetching={isFetching}
				isSuccess={isSuccess}
				isError={isError}
				error={error}
				onModalOpen={handleOpenModal}
			></PartyList>
		</div>
	);
}

export default PartyBoard;
