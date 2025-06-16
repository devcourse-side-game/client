import React from 'react';
import { List, Divider } from '@mui/material';
import PartyMemberListItem from './PartyMemberListItem';
import { PartyMemberListProps } from '../../types/Party';

function PartyMemberList({ members }: PartyMemberListProps) {
	return (
		<List>
			{members.map((member) => (
				<>
					<PartyMemberListItem member={member} />
					<Divider component='li' sx={{ borderColor: 'black' }} />
				</>
			))}
		</List>
	);
}

export default PartyMemberList;
