import { ReactNode, useMemo, useState } from 'react';
import { TModalState } from '../types/Party';
import { ModalContext } from './ModalContext';
export function ModalProvider({ children }: { children: ReactNode }) {
	const [modalState, setModalState] = useState<TModalState>({ type: '', payload: null });
	const openModal = (type: TModalState['type'], payload?: TModalState['payload']) => {
		setModalState({ type: type, payload: payload } as TModalState);
	};
	const closeModal = () => {
		setModalState({ type: '', payload: null });
	};
	// 리렌더링 방지
	const value = useMemo(() => ({ modalState, openModal, closeModal }), [modalState]);

	return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
