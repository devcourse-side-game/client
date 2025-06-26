import React from 'react';
import PartyBoard from '../components/Party/PartyBoard';
import { ModalProvider } from '../contexts/ModalProvider';
import PartyGlobalModal from '../components/Party/PartyModal/PartyGlobalModal';

function Home() {
	return (
		<div className='Home'>
			<ModalProvider>
				<PartyBoard></PartyBoard>

				<PartyGlobalModal />
			</ModalProvider>
		</div>
	);
}

export default Home;
