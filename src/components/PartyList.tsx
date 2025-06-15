import React from 'react';
import List from '@mui/material/List';
import PartyListItem from './PartyListItem';
import { Party } from '../types/Party';

const dummyItem: Party = {
	id: 1,
	title: '로스트아크 발탄 하드 파티 모집',
	game_id: 1,
	game_name: '로스트아크',
	purpose_tag: '레이드',
	max_participants: 8,
	current_participants: 3,
	start_time: '2025-06-10T18:00:00',
	end_time: '2025-06-10T20:00:00',
	is_completed: false,
	is_private: false,
	creator_id: 1,
	creator_name: '개멋있는사람',
	created_at: '2025-06-03T14:30:00+09:00',
	updated_at: '2025-06-03T14:30:00+09:00',
};

function PartyList() {
	return (
		<List
			sx={{
				display: 'flex',
				flexDirection: 'column',
				maxWidth: '80%',
				width: '800px',
			}}
		>
			<PartyListItem party={dummyItem} />
			<PartyListItem party={dummyItem} />
			<PartyListItem party={dummyItem} />
		</List>
	);
}

export default PartyList;
