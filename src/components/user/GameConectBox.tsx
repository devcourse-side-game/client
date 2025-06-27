import { Avatar, Box, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function GameConectBox() {
	return (
		<Box
			sx={{
				width: '100%',
				bgcolor: '#e7e7e7',
				'&:hover': { bgcolor: '#ddd' },
				borderRadius: '15px',
				mt: 1,
				cursor: 'pointer',
			}}
		>
			<Grid container spacing={1} sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
				<Grid size={2}>
					<Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
				</Grid>
				<Grid size='grow'>
					<Typography variant='h6'>스팀</Typography>
				</Grid>
				<Grid
					size={1}
					sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
				>
					<AddIcon />
				</Grid>
			</Grid>
		</Box>
	);
}

export default GameConectBox;
