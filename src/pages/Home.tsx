import React from 'react';
import PartyBoard from '../components/Party/PartyBoard';
import { ModalProvider } from '../contexts/ModalProvider';
import PartyGlobalModal from '../components/Party/PartyModal/PartyGlobalModal';
import { HomeContainer } from '../styles/pages/Home.styles';

function Home() {
	return (
		<HomeContainer className='Home'>
			<ModalProvider>
				<PartyBoard></PartyBoard>

				<PartyGlobalModal />
			</ModalProvider>
		</HomeContainer>
	);
}

export default Home;
