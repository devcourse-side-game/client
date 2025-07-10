import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PartyBoard from '../components/Party/PartyBoard';
import { ModalProvider } from '../contexts/ModalProvider';
import PartyGlobalModal from '../components/Party/PartyModal/PartyGlobalModal';
import { HomeContainer } from '../styles/pages/Home.styles';
import { Tab, Tabs, useTheme } from '@mui/material';
import { TTabType } from '../types/party';
import { useSelector } from 'react-redux';
import { RootState } from '../stores';

function Home() {
	const location = useLocation();
	const navigate = useNavigate();
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
	const theme = useTheme();

	// 현재 경로에 따라 탭 값 결정
	const getTabValue = (): TTabType => {
		if (location.pathname === '/my-parties') {
			return TTabType.MY_PARTIES;
		}
		return TTabType.PARTY_FINDER;
	};

	const handleTabChange = (event: React.SyntheticEvent, newValue: TTabType) => {
		if (newValue === TTabType.MY_PARTIES) {
			if (isLoggedIn) {
				navigate('/my-parties');
			} else {
				navigate('/login');
			}
		} else {
			navigate('/party-finder');
		}
	};

	return (
		<HomeContainer className='Home' maxWidth='lg' minWidth='sm' margin='auto'>
			<ModalProvider>
				<Tabs
					value={getTabValue()}
					onChange={handleTabChange}
					aria-label='nav tabs example'
					role='navigation'
					sx={{
						borderBottom: 1,
						borderColor: 'divider',
						// 탭 인디케이터 색상 변경
						'& .MuiTabs-indicator': {
							backgroundColor: theme.customColor.button.selectBg, // 선택된 탭 아래 선 색상
						},
					}}
				>
					<Tab
						sx={{
							color: theme.customColor.grayText, // 기본 글자색 (선택 안됨)
							'&.Mui-selected': {
								color: theme.customColor.title.main, // 선택된 글자색
								fontWeight: 'bold',
							},
						}}
						label='내 파티'
					/>
					<Tab
						sx={{
							color: theme.customColor.grayText,
							'&.Mui-selected': {
								color: theme.customColor.title.main,
								fontWeight: 'bold',
							},
						}}
						label='파티 찾기'
					/>
				</Tabs>
				<PartyBoard type={getTabValue()}></PartyBoard>
				<PartyGlobalModal />
			</ModalProvider>
		</HomeContainer>
	);
}

export default Home;
