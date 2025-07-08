import React, { useState } from 'react';
import PartyBoard from '../components/Party/PartyBoard';
import { ModalProvider } from '../contexts/ModalProvider';
import PartyGlobalModal from '../components/Party/PartyModal/PartyGlobalModal';
import { HomeContainer } from '../styles/pages/Home.styles';
import { Tab, Tabs } from '@mui/material';
import { TTabType } from '../types/party';

function samePageLinkNavigation(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
	if (
		event.defaultPrevented ||
		event.button !== 0 || // ignore everything but left-click
		event.metaKey ||
		event.ctrlKey ||
		event.altKey ||
		event.shiftKey
	) {
		return false;
	}
	return true;
}

interface LinkTabProps {
	label?: string;
	href?: string;
	selected?: boolean;
}

function LinkTab(props: LinkTabProps) {
	return (
		<Tab
			component='a'
			onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
				// Routing libraries handle this, you can remove the onClick handle when using them.
				if (samePageLinkNavigation(event)) {
					event.preventDefault();
				}
			}}
			aria-current={props.selected && 'page'}
			{...props}
		/>
	);
}

function Home() {
	const [tabValue, setTabValue] = useState<TTabType>(TTabType.PARTY_FINDER);
	const handleTabChange = (event: React.SyntheticEvent, newValue: TTabType) => {
		if (
			event.type !== 'click' ||
			(event.type === 'click' &&
				samePageLinkNavigation(event as React.MouseEvent<HTMLAnchorElement, MouseEvent>))
		) {
			setTabValue(newValue);
		}
	};
	return (
		<HomeContainer className='Home'>
			<ModalProvider>
				<Tabs
					value={tabValue}
					onChange={handleTabChange}
					aria-label='nav tabs example'
					role='navigation'
				>
					<LinkTab label='내 파티' href='/drafts' />
					<LinkTab label='파티 찾기' href='/trash' />
				</Tabs>
				<PartyBoard type={tabValue}></PartyBoard>
				<PartyGlobalModal />
			</ModalProvider>
		</HomeContainer>
	);
}

export default Home;
