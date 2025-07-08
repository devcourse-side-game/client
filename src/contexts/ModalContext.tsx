import { createContext } from 'react';
import { TModalState } from '../types/party';

type TModalContext = {
	modalState: TModalState;
	openModal: (type: TModalState['type'], data?: TModalState['payload']) => void;
	closeModal: () => void;
};

export const ModalContext = createContext<TModalContext | null>(null);
