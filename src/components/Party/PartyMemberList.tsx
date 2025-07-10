import React from 'react';
import { Stack, useTheme } from '@mui/material';
import PartyMemberListItem from './PartyMemberListItem';
import { TPartyMember } from '../../types/party';

export type TPartyMemberListProps = {
	members: TPartyMember[] | null;
	partyId: number | null;
	isCompleted: boolean;
	partyLeaderId: number | null;
};

function PartyMemberList({ members, partyId, isCompleted, partyLeaderId }: TPartyMemberListProps) {
	if (members === null) return <div>멤버가 없습니다</div>;
	return (
		<Stack>
			{members
				.sort((a, b) => {
					if (a.isLeader && !b.isLeader) return 1;
					return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
				})
				.map((member) => (
					<PartyMemberListItem
						key={member.id}
						member={member}
						partyId={partyId}
						isCompleted={isCompleted}
						partyLeaderId={partyLeaderId}
					/>
				))}
		</Stack>
	);
}

export default PartyMemberList;
