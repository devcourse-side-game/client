import { Avatar, Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function GameConectBox() {
	const theme = useTheme();
	return (
		<Paper
			sx={{
				width: '100%',
				'&:hover': { bgcolor: theme.customColor.input.bg },
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
		</Paper>
	);
}

export default GameConectBox;
