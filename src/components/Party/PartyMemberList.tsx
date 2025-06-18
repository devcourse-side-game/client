import React from 'react';
import { List, Divider } from '@mui/material';
import PartyMemberListItem from './PartyMemberListItem';
import { TPartyMember } from '../../types/Party';

export type TPartyMemberListProps = {
	members: TPartyMember[] | null;
};

function PartyMemberList({ members }: TPartyMemberListProps) {
	if (members === null) return <div>멤버가 없습니다</div>;
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
