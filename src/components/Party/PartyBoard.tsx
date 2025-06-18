import React from 'react';
import { Button, Typography } from '@mui/material';
import { BOARD_PARTY } from '../../constants/Party';
import PartyFilter from './PartyFilter';
import PartyList from './PartyList';
import { useQueryClient } from '@tanstack/react-query';

function PartyBoard() {
	const queryClient = useQueryClient();
	/* 게시판 데이터 무효화를 통해 파티 목록 갱신*/
	const handleRefreshClick = () => {
		queryClient.invalidateQueries({ queryKey: ['parties'] });
	};

	return (
		<div className='BoardParty'>
			<Typography>{BOARD_PARTY.PARTY_BOARD_TITLE}</Typography>
			<Typography>{BOARD_PARTY.PARTY_BOARD_SUBTITLE}</Typography>
			<PartyFilter></PartyFilter>
			<Button onClick={handleRefreshClick}>새로운 게시글 불러오기</Button>
			<PartyList></PartyList>
		</div>
	);
}

export default PartyBoard;
