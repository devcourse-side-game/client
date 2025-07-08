import React from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import PartyBoard from '../components/Party/PartyBoard';
import { ModalProvider } from '../contexts/ModalProvider';
import PartyGlobalModal from '../components/Party/PartyModal/PartyGlobalModal';
import { HomeContainer } from '../styles/pages/Home.styles';
import { Tab, Tabs } from '@mui/material';
import { TTabType } from '../types/party';

function Home() {
	const location = useLocation();
	const navigate = useNavigate();

	// 현재 경로에 따라 탭 값 결정
	const getTabValue = (): TTabType => {
		if (location.pathname === '/my-parties') {
			return TTabType.MY_PARTIES;
		}
		return TTabType.PARTY_FINDER;
	};

	const handleTabChange = (event: React.SyntheticEvent, newValue: TTabType) => {
		if (newValue === TTabType.MY_PARTIES) {
			navigate('/my-parties');
		} else {
			navigate('/party-finder');
		}
	};

	return (
		<HomeContainer className='Home'>
			<ModalProvider>
				<Tabs
					value={getTabValue()}
					onChange={handleTabChange}
					aria-label='nav tabs example'
					role='navigation'
				>
					<Tab label='내 파티' />
					<Tab label='파티 찾기' />
				</Tabs>
				<PartyBoard type={getTabValue()}></PartyBoard>
				<PartyGlobalModal />
			</ModalProvider>
		</HomeContainer>
	);
}

export default Home;
