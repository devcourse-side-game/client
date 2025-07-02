import { createContext, ReactNode, useContext, useState } from 'react';

interface DialogContextProps {
	show: (message: string, onConfirm?: () => void) => void;
	hide: () => void;
	isOpen: boolean;
	message: string;
	onConfirm?: () => void;
}

const AuthModalContext = createContext<DialogContextProps | undefined>(undefined);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [onConfirm, setOnConfirm] = useState<() => void>();

	function show(msg: string, confirmCallback?: () => void) {
		setMessage(msg);
		setOnConfirm(() => confirmCallback); // 함수 래핑 주의
		setIsOpen(true);
	}

	function hide() {
		setIsOpen(false);
		setMessage('');
		setOnConfirm(undefined);
	}

	return (
		<AuthModalContext.Provider value={{ show, hide, isOpen, message, onConfirm }}>
			{children}
		</AuthModalContext.Provider>
	);
};

export const useDialog = () => {
	const context = useContext(AuthModalContext);
	if (!context) {
		throw new Error('useDialog must be used within a DialogProvider');
	}
	return context;
};
