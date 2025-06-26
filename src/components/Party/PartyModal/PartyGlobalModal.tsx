// components/modal/GlobalModal.tsx
import React from 'react';
import CommonModal from './CommonModal';
import PartyCreateFlow from './flows/PartyCreateFlow';
import PartyJoinFlow from './flows/PartyJoinFlow';
import LeaderChangeFlow from './flows/LeaderChangeFlow';
import MemberBanFlow from './flows/MemberBanFlow';
import { useModal } from '../../../hooks/useModal';
// ... 등등

export default function PartyGlobalModal() {
	const { modalState, closeModal } = useModal();

	const renderModalContent = () => {
		switch (modalState.type) {
			case 'create':
				return <PartyCreateFlow onFlowComplete={closeModal} />;
			case 'join':
				console.log('join modal opend');
				if (modalState.payload.partyId !== undefined)
					return (
						<PartyJoinFlow
							onFlowComplete={closeModal}
							partyId={modalState.payload.partyId}
						/>
					);
				else return null;
			case 'leaderChange':
				if (
					modalState.payload.partyId !== undefined &&
					modalState.payload.userId !== undefined &&
					modalState.payload.userName !== undefined
				)
					return (
						<LeaderChangeFlow
							onFlowComplete={closeModal}
							partyId={modalState.payload.partyId}
							userId={modalState.payload.userId}
							userName={modalState.payload.userName}
						/>
					);
				else return null;
			case 'memberBan':
				console.log('memberBan modal opend');
				if (
					modalState.payload.partyId !== undefined &&
					modalState.payload.userId !== undefined &&
					modalState.payload.userName !== undefined
				)
					return (
						<MemberBanFlow
							onFlowComplete={closeModal}
							partyId={modalState.payload.partyId}
							userId={modalState.payload.userId}
							userName={modalState.payload.userName}
						/>
					);
				else return null;
			case 'memberLike':
				if (
					modalState.payload.partyId !== undefined &&
					modalState.payload.userId !== undefined &&
					modalState.payload.userName !== undefined
				)
					return <PartyCreateFlow onFlowComplete={closeModal} />;
				else return null;
			default:
				return null;
		}
	};

	return (
		<CommonModal open={modalState.type !== ''} onClose={closeModal}>
			{renderModalContent()}
		</CommonModal>
	);
}
