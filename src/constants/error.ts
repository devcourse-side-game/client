export enum ErrorCode {
	// 사용자 관련 오류 (u-xxx)
	REPASSWORD_MISMATCH = 'u-001', // 비밀번호 확인이 일치하지 않음
	USER_ALREADY_EXISTS = 'u-002', // 이미 존재하는 아이디

	// 인증 관련 오류 (a-xxx)
	USER_NOT_FOUND = 'a-001', // 존재하지 않는 아이디
	INVALID_PASSWORD = 'a-002', // 비밀번호 불일치
	ACCESS_TOKEN_EXPIRED = 'a-003', // 액세스 토큰 만료
	REFRESH_TOKEN_EXPIRED = 'a-004', // 리프레시 토큰 만료
	REFRESH_TOKEN_INVALID = 'a-005', // 유효하지 않은 리프레시 토큰
	UNAUTHORIZED = 'a-006', // 인증되지 않은 접근

	// 파티 관련 오류 (p-xxx)
	PARTY_NOT_FOUND = 'p-001', // 파티를 찾을 수 없음
	PARTY_ALREADY_JOINED = 'p-002', // 이미 참가한 파티
	PARTY_MAX_PARTICIPANTS = 'p-003', // 최대 인원 초과
	PARTY_INVALID_ACCESS_CODE = 'p-004', // 잘못된 접근 코드 또는 비공개 파티 접근 오류
	PARTY_LEADER_CANNOT_LEAVE = 'p-005', // 파티장은 탈퇴할 수 없음
	PARTY_MEMBER_NOT_FOUND = 'p-006', // 파티 멤버를 찾을 수 없음
	PARTY_NOT_LEADER = 'p-007', // 파티장이 아님
	PARTY_SELF_ACTION_NOT_ALLOWED = 'p-008', // 자기 자신에 대한 작업 불가
	PARTY_ALREADY_COMPLETED = 'p-009', // 이미 완료된 파티
	PARTY_NOT_CREATOR = 'p-010', // 파티 생성자가 아님

	// 게임 관련 오류 (gm-xxx)
	GAME_NOT_FOUND = 'gm-001', // 게임을 찾을 수 없음

	// 게임 프로필 관련 오류 (ugp-xxx)
	USER_GAME_PROFILE_NOT_FOUND = 'ugp-001',

	// 일반 오류 (g-xxx)
	VALIDATION_ERROR = 'g-001',
	DATABASE_ERROR = 'g-002',
	INTERNAL_SERVER_ERROR = 'g-003',
	FORBIDDEN = 'g-004', // 권한 없음
}

/*************************************************/

export const NONE_ERROR = ''; // 에러 초기화

/* 로그인, 회원가입 유효성 검사 에러 문구 */
export const NOT_FOUND_USER = '존재하지 않는 계정입니다.';
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
export const NICKNAME_CONFIRM_REQUIRED = '닉네임 사용여부를 확인해주세요.';

export const EXPIRED_ACCESS_TOKEN = '인증 토큰이 만료되었습니다.';
