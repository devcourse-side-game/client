import React from 'react';
import { Box, Container } from '@mui/material';

function TestFooter() {
	return (
		<Box
			component='footer'
			sx={{
				backgroundColor: (theme) =>
					theme.palette.mode === 'light'
						? theme.palette.grey[200]
						: theme.palette.grey[800],
				p: 6, // padding
			}}
		>
			<Container maxWidth='lg'>footer</Container>
		</Box>
	);
}

export default TestFooter;
