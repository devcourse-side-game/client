import React from 'react';
import { List, Divider } from '@mui/material';
import PartyMemberListItem from './PartyMemberListItem';
import { TPartyMemberListProps } from '../../types/Party';

function PartyMemberList({ members }: TPartyMemberListProps) {
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
