import React from 'react';
import { List, Divider } from '@mui/material';
import PartyMemberListItem from './PartyMemberListItem';
import { TPartyMember } from '../../types/Party';

export type TPartyMemberListProps = {
	members: TPartyMember[] | null;
	partyId: number | null;
};

function PartyMemberList({ members, partyId }: TPartyMemberListProps) {
	console.log(`partyId : ${partyId}`);
	if (members === null) return <div>멤버가 없습니다</div>;
	return (
		<List>
			{members.map((member) => (
				<>
					<PartyMemberListItem member={member} partyId={partyId} />
					<Divider component='li' sx={{ borderColor: 'black' }} />
				</>
			))}
		</List>
	);
}

export default PartyMemberList;
