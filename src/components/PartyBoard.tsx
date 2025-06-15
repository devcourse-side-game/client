import React from 'react';
import { Typography } from '@mui/material';
import { BOARD_PARTY } from '../constants/Party';
import PartyFilter from './PartyFilter';
import PartyList from './PartyList';

function PartyBoard() {
	return (
		<div className='BoardParty'>
			<Typography>{BOARD_PARTY.PARTY_BOARD_TITLE}</Typography>
			<Typography>{BOARD_PARTY.PARTY_BOARD_SUBTITLE}</Typography>
			<PartyFilter></PartyFilter>
			<PartyList></PartyList>
		</div>
	);
}

export default PartyBoard;
