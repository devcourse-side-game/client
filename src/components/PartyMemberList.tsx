import React from 'react';
import { List, Divider } from '@mui/material';
import PartyMemberListItem from './PartyMemberListItem';
import { PartyMemberProps } from '../types/Party';

function PartyMemberList({ members }: { members: PartyMemberProps[] }) {
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
