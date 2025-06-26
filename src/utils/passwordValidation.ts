import {
	PASSWARD_LENGTH,
	PASSWARD_LETTER,
	PASSWARD_NUMBER,
	PASSWARD_SYMBOL,
	VALID_COUNT,
} from '../constants/regex';

export const validatePassword = (password: string) => {
	const isLengthValid = password ? password.length >= PASSWARD_LENGTH : false;
	const hasLetter = PASSWARD_LETTER.test(password);
	const hasNumber = PASSWARD_NUMBER.test(password);
	const hasSymbol = PASSWARD_SYMBOL.test(password);
	const isComplexValid = [hasLetter, hasNumber, hasSymbol].filter(Boolean).length >= VALID_COUNT;

	return { isLengthValid, isComplexValid };
};
