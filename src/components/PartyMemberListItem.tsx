import React from 'react';
import { Stack, Avatar, Typography, Chip } from '@mui/material';
import { PartyMemberProps } from '../types/Party';

function PartyMemberListItem({ member }: { member: PartyMemberProps }) {
	return (
		<Stack
			direction='row'
			sx={{
				minHeight: '50px',
				width: '100%',
				backgroundColor: 'gray',
				textAlign: 'start',
				alignItems: 'center',
			}}
		>
			<Avatar alt='tester'></Avatar>
			<Stack direction='column'>
				<Stack direction='row' alignItems='center'>
					<Typography variant='subtitle1'>{member.username}</Typography>
					{member.is_leader ? (
						<Chip
							label='파티장'
							sx={{
								fontSize: '10px',
								height: '14px',
								backgroundColor: 'blue',
								color: 'white',
							}}
						/>
					) : (
						''
					)}
				</Stack>
				<Typography variant='subtitle2'>닉네임이!</Typography>
			</Stack>
		</Stack>
	);
}
export default PartyMemberListItem;
