import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function TestHeader() {
	return (
		<div className='TestHeader'>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6'>LOGO</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default TestHeader;
