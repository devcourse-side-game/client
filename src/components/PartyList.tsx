import React from 'react';
import List from '@mui/material/List';
import PartyListItem from './PartyListItem';

function PartyList() {
	return (
		<div>
			<List
				sx={{ display: 'flex', flexDirection: 'column', maxWidth: '80%', width: '800px' }}
			>
				<PartyListItem />
				<PartyListItem />
				<PartyListItem />
			</List>
		</div>
	);
}

export default PartyList;
