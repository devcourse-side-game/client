import React from 'react';
import TestHeader from '../testSori/TestHeader';
import TestFooter from '../testSori/TestFooter';
import PartyBoard from '../components/party/PartyBoard';

function Home() {
	return (
		<div className='Home'>
			<TestHeader></TestHeader>
			<PartyBoard></PartyBoard>
			<TestFooter></TestFooter>
		</div>
	);
}

export default Home;
