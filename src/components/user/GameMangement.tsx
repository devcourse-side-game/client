import { Box, Container, Divider, Typography } from '@mui/material';

function GameMangement() {
	return (
		<Container maxWidth='sm' sx={{ p: 2, width: '500px' }}>
			<Box display='flex' alignItems='center' gap={2}>
				<Box>
					<Typography variant='h5'>게임 연동하기</Typography>
				</Box>
			</Box>

			<Divider sx={{ my: 2 }} />
		</Container>
	);
}

export default GameMangement;
