//파티관련
export type TParty = {
	id: number;
	title: string;
	game_id: number;
	game_name: string;
	purpose_tag: string;
	max_participants: number;
	current_participants: number;
	start_time: string;
	end_time: string;
	is_completed: boolean;
	is_private: boolean;
	creator_id: number;
	creator_name: string;
	created_at: string;
	updated_at: string;
};
export type TPartyListItemDetailResponse = {
	id: number;
	title: string;
	game_id: number;
	game_name: string;
	purpose_tag: string;
	max_participants: number;
	current_participants: number;
	start_time: string;
	end_time: string;
	is_completed: boolean;
	is_private: boolean;
	creator_id: number;
	creator_name: string;
	created_at: string;
	updated_at: string;
	description: string;
	members: TPartyMember[];
};

// 파티게시판 멤버관련
export type TPartyMember = {
	id: number;
	username: string;
	is_leader: boolean;
	joined_at: string;
};

export type TGetPartiesResponse = {
	parties: TParty[];
	total: number;
	page: number;
	limit: number;
};

// 검색 옵션
export type TFilterOptions = {
	type: string;
	value: string | number | null;
	label: string;
};
export type TPartyListFilterOptions = {
	options: TFilterOptions[];
};

// gameOptions 배열에 있는 객체의 타입 정의
export type TOptionGame = {
	id: number;
	title: string;
	category: string;
};

// 파티 생성 리퀘스트
export type TPartyCreateRequest = {
	title: string;
	gameId: number | undefined;
	purposeTag: string;
	maxParticipants: number;
	startTime: string;
	endTime: string;
	description: string;
	isPrivate: boolean;
	accessCode: string;
};

// 파티 생성 실패 응답
export type TPartyCreateSuccessResponse = {
	message: string;
	partyId: number;
};

//파티 생성 성공 응답
export type TBadRequestResponse = {
	statusCode: number;
	message: string;
	error: string;
};

//인증 실패 응답
export type TBadAuthResponse = {
	statusCode: number;
	message: string;
	error: string;
};

/**  */
export type TPartyFormFlow = 'form' | 'success';

export type TPartyModalType = 'create' | 'join' | 'leaderChange' | 'memberBan' | 'memberLike' | '';

export type TModalPayloadKeys = 'partyId' | 'targetUserId';

// 모달에 필요한 데이터 타입들
export type TCreatePartyData = null; // 'create' 타입은 추가 데이터가 필요 없음
export type TJoinPartyData = { partyId: number };
export type TMemberBanData = { partyId: number; userId: number; userName: string };
export type TLeaderChangeData = { partyId: number; userId: number; userName: string };
export type TmemberLikeData = { partyId: number; userId: number; userName: string };

// 'type'을 기준으로 어떤 data 타입을 가질지 묶어줍니다.
export type TModalState =
	| { type: ''; payload?: null } // 모달의 닫힘 상태 표시
	| { type: 'create'; payload?: TCreatePartyData } // data가 없으므로 optional
	| { type: 'join'; payload: TJoinPartyData }
	| { type: 'memberBan'; payload: TMemberBanData }
	| { type: 'leaderChange'; payload: TLeaderChangeData }
	| { type: 'memberLike'; payload: TmemberLikeData };
