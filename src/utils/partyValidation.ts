import { MESSAGE_ERROR } from '../constants/error';
import { TPartyCreateFormErrors, TPartyCreateRequest } from '../types/Party';

export default function craetePratyFormValidation(party: TPartyCreateRequest) {
	try {
		const errors: TPartyCreateFormErrors = {
			title: checkPartyTitle(party.title),
			ownerNickname: checkPartyOwnerNickname(party.GameUsername),
			accessCode: checkPartyAccessCode(party.accessCode),
			gameId: '',
			description: '',
			maxParticipants: '',
		};
		return errors;
	} catch (error) {
		console.error('파티 생성 유효성 검사 오류', error);
		const errors: TPartyCreateFormErrors = {
			title: '',
			ownerNickname: '',
			accessCode: '',
			gameId: '',
			description: '',
			maxParticipants: '',
		};
		return errors;
	}
}

function checkPartyTitle(title: string) {
	if (!title) {
		return MESSAGE_ERROR.TITLE.REQUIRED;
	}
	if (title.trim() === '') {
		return MESSAGE_ERROR.TITLE.REQUIRED;
	}
	return '';
}
function checkPartyOwnerNickname(ownerNickname: string) {
	if (!ownerNickname) {
		return MESSAGE_ERROR.OWNER_NICKNAME.REQUIRED;
	}
	if (ownerNickname.trim() === '') {
		return MESSAGE_ERROR.OWNER_NICKNAME.REQUIRED;
	}
	return '';
}
function checkPartyAccessCode(accessCode: string) {
	if (!accessCode) {
		return MESSAGE_ERROR.ACCESS_CODE.REQUIRED;
	}
	if (accessCode.trim() === '') {
		return MESSAGE_ERROR.ACCESS_CODE.REQUIRED;
	}
	return '';
}
function checkPartyGameId(gameId: string) {
	if (!gameId) {
		return MESSAGE_ERROR.GAME_ID.REQUIRED;
	}
	return '';
}
