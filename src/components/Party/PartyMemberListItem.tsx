import React from 'react';
import { Stack, Avatar, Typography, Chip, Button, Box } from '@mui/material';
import { PartyMember } from '../../types/Party';
import { PARTY_LIST_ITEM } from '../../constants/Party';

function PartyMemberListItem({ member }: { member: PartyMember }) {
	return (
		<Stack direction='row'>
			<Avatar alt='tester'></Avatar>
			<Stack direction='column'>
				<Stack direction='row' alignItems='center'>
					<Typography variant='subtitle1'>{member.username}</Typography>
					{member.is_leader ? <Chip label='파티장' /> : <></>}
				</Stack>
				<Typography variant='subtitle2'>닉네임이!</Typography>
			</Stack>
			<Box sx={{ flexGrow: 1 }}></Box>
			<Button>{PARTY_LIST_ITEM.BTN_MEMBER_BAN_TEXT}</Button>
		</Stack>
	);
}
export default PartyMemberListItem;
