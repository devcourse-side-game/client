import React from 'react';
import TestHeader from '../testSori/TestHeader';
import TestFooter from '../testSori/TestFooter';
import PartyBoard from '../components/Party/PartyBoard';
import { ModalProvider } from '../contexts/ModalProvider';
import PartyGlobalModal from '../components/Party/PartyModal/PartyGlobalModal';

function Home() {
	return (
		<div className='Home'>
			<ModalProvider>
				<TestHeader></TestHeader>
				<PartyBoard></PartyBoard>
				<TestFooter></TestFooter>
				<PartyGlobalModal />
			</ModalProvider>
		</div>
	);
}

export default Home;
