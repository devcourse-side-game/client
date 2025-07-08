import { MESSAGE_ERROR } from '../constants/error';
import { TPartyCreateFormErrors, TPartyCreateRequest } from '../types/party';

export default function craetePratyFormValidation(party: TPartyCreateRequest) {
	try {
		console.log(party.profileId);
		console.log(party.gameUsername);
		const errors: TPartyCreateFormErrors = {
			title: checkPartyTitle(party.title),
			gameUsername: !party.profileId ? checkPartyGameUsername(party.gameUsername) : '',
			accessCode: checkPartyAccessCode(party.accessCode),
			gameId: checkPartyGameId(party.gameId),
			description: '',
			maxParticipants: '',
		};
		return errors;
	} catch (error) {
		console.error('파티 생성 유효성 검사 오류', error);
		const errors: TPartyCreateFormErrors = {
			title: '',
			gameUsername: '',
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
function checkPartyGameUsername(gameUsername: string) {
	if (!gameUsername) {
		return MESSAGE_ERROR.GAME_USERNAME.REQUIRED;
	}
	if (gameUsername.trim() === '') {
		return MESSAGE_ERROR.GAME_USERNAME.REQUIRED;
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
function checkPartyGameId(gameId: number | undefined) {
	if (!gameId) {
		return MESSAGE_ERROR.GAME_ID.REQUIRED;
	}
	return '';
}
