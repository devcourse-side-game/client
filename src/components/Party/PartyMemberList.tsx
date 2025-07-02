import React from 'react';
import { Stack } from '@mui/material';
import PartyMemberListItem from './PartyMemberListItem';
import { TPartyMember } from '../../types/Party';

export type TPartyMemberListProps = {
	members: TPartyMember[] | null;
	partyId: number | null;
};

function PartyMemberList({ members, partyId }: TPartyMemberListProps) {
	if (members === null) return <div>멤버가 없습니다</div>;
	return (
		<Stack>
			{members
				.sort((a, b) => {
					if (a.isLeader && !b.isLeader) return -1;
					return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
				})
				.map((member) => (
					<>
						<PartyMemberListItem member={member} partyId={partyId} />
					</>
				))}
		</Stack>
	);
}

export default PartyMemberList;
