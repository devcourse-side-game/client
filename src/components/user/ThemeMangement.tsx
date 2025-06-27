import { Box, Container, Divider, Typography } from '@mui/material';

function ThemeMangement() {
	return (
		<Container maxWidth='sm' sx={{ p: 2, width: '500px' }}>
			<Box display='flex' alignItems='center' gap={2}>
				<Box>
					<Typography variant='h5'>테마 세팅</Typography>
				</Box>
			</Box>

			<Divider sx={{ my: 2 }} />
		</Container>
	);
}

export default ThemeMangement;
