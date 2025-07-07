export const PARTY_LIST_ITEM = {
	// AccordionDetails 텍스트
	DETAILS_TITLE: '파티 세부 정보',
	//DETAILS_MEMBERS_TITLE: '파티원',
	/**
	 * 파티원 수를 (n / m) 형식의 텍스트로 반환
	 * @param current 현재 파티원 수
	 * @param max 최대 파티원 수
	 * @returns "(current / max)" 형식의 문자열
	 */
	getPartyMembersTitle: (current: number | null, max: number | null) =>
		`파티원 (${current ? current : 'null'} /${max ? max : 'null'})`,
	// member 관리
	BTN_MEMBER_BAN_TEXT: '강퇴',
};
export const BOARD_PARTY = {
	// 게시판 정보
	PARTY_BOARD_TITLE: '게임 파티 게시판',
	PARTY_BOARD_SUBTITLE_FINDER: '함께 게임할 파티원을 찾아보세요!',
	PARTY_BOARD_SUBTITLE_MY_PARTIES: '참여중인 파티를 관리하세요!.',
};
