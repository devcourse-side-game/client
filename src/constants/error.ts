export const NONE_ERROR = ''; // 에러 초기화

/* 로그인, 회원가입 유효성 검사 에러 문구 */
export const EMAIL_ALREADY_USED_ERROR = '이미 가입된 계정입니다. \n 다른 이메일을 입력해주세요.';
export const ENTER_EMAIL = '이메일을 입력해주세요.';
export const EMAIL_VALIDATION_ERROR = '올바른 이메일 형식을 입력해주세요.';
export const ENTER_PASSWORD = '비밀번호를 입력해주세요.';
export const PASSWORD_MISMATCH_ERROR = '비밀번호가 일치하지 않습니다.';
export const ENTER_USERNAME = '닉네임을 입력해주세요.';
export const ALREADU_USED_USERNAME = '이미 사용중인 닉네임입니다.';
export const INVALID_CREDENTIALS = '인증에 실패하였습니다.';
export const PASSWORD_COMPLEXITY_ERROR =
	'비밀번호는 8자 이상이며, 영문/숫자/기호 중 2가지 이상을 포함해야 합니다.';

/* 파티 생성 유효성 검사 에러 문구 */
export const MESSAGE_ERROR = {
	TITLE: {
		REQUIRED: '파티 이름을 입력해주세요.',
	},
	GAME_USERNAME: {
		REQUIRED: '파티장 닉네임을 입력해주세요.',
	},
	ACCESS_CODE: {
		REQUIRED: '방 비밀번호를 입력해주세요.',
	},
	DESCRIPTION: {
		REQUIRED: '파티 설명을 입력해주세요.',
	},
	MAX_PARTICIPANTS: {
		REQUIRED: '최대 참가자 수를 입력해주세요.',
	},
	GAME_ID: {
		REQUIRED: '게임을 선택해주세요.',
	},
};
