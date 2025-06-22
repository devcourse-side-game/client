import React from 'react';
import { Box, Stack, Typography, TextField, Button } from '@mui/material';
import SearchableGameSelect from './SearchableGameSelect';
function PartyFilter() {
	return (
		<Box bgcolor='greenyellow'>
			<Typography>필터 옵션</Typography>
			<Stack direction='row'>
				<SearchableGameSelect></SearchableGameSelect>
				<TextField type='Text' label='파티장 이름 입력'></TextField>
				<TextField type='Text' label='파티 이름 입력'></TextField>
			</Stack>
			<Button>필터 적용</Button>
		</Box>
	);
}
export default PartyFilter;
