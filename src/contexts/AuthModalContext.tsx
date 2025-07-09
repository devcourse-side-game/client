import { createContext, ReactNode, useContext, useState } from 'react';

interface DialogContextProps {
	show: (message: string, onConfirm?: () => void, onCancle?: () => void) => void;
	hide: () => void;
	isOpen: boolean;
	message: string;
	onConfirm?: () => void;
	onCancle?: () => void;
}

const AuthModalContext = createContext<DialogContextProps | undefined>(undefined);

export function AuthModalProvider({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [onConfirm, setOnConfirm] = useState<() => void>();
	const [onCancle, setOnCancle] = useState<() => void>();

	function show(msg: string, confirmCallback?: () => void, cancleCallback?: () => void) {
		setMessage(msg);
		setOnConfirm(() => confirmCallback); // 함수 래핑 주의
		setOnCancle(() => cancleCallback);
		setIsOpen(true);
	}

	function hide() {
		setIsOpen(false);
		setMessage('');
		setOnConfirm(undefined);
	}

	return (
		<AuthModalContext.Provider value={{ show, hide, isOpen, message, onConfirm, onCancle }}>
			{children}
		</AuthModalContext.Provider>
	);
}

export const useDialog = () => {
	const context = useContext(AuthModalContext);
	if (!context) {
		throw new Error('useDialog must be used within a DialogProvider');
	}
	return context;
};
