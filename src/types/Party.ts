// ===== 파티 기본 타입 =====
export type TParty = {
	id: number;
	title: string;
	gameId: number;
	gameBannerUrl: string;
	purposeTag: string;
	maxParticipants: number;
	isCompleted: boolean;
	isPrivate: boolean;
	creatorId: number;
	createdAt: string;
	updatedAt: string;
	description: string;
	accessCode: string | null;
	leader: TLeader;
	currentMemberCount: number;
};

// ===== 사용자 관련 타입 =====
export type TLeader = {
	userId: number;
	username: string;
	gameUsername: string;
};

export type TUser = {
	id: number;
	username: string;
	email: string;
	profileImage: string | null;
};

// ===== 게임 관련 타입 =====
export type TGame = {
	id: number;
	name: string;
	platform: string;
	steamAppId: number;
	bannerUrl: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	slug: string;
};

export type TOptionGame = {
	id: number;
	title: string;
	category: string;
};

// ===== 파티 멤버 관련 타입 =====
export type TPartyMember = {
	id: number;
	userId: number;
	username: string;
	isLeader: boolean;
	joinedAt: string;
	leftAt: string | null;
	gameUsername: string;
};

export type TUserGameProfile = {
	id: number | null;
	userId: number;
	gameId: number | null;
	gameUsername: string;
	game: TGame | null;
};

// ===== 파티 상세 정보 타입 =====
export type TPartyListItemDetailResponse = {
	id: number;
	title: string;
	gameId: number;
	creatorId: number;
	creator: TUser;
	game: TGame;
	purposeTag: string;
	maxParticipants: number;
	//currentParticipants: number;
	description: string;
	isPrivate: boolean;
	accessCode: string | null;
	isCompleted: boolean;
	created_at: string;
	updated_at: string;

	members: TPartyMember[];
};

// ===== 파티 목록 및 페이지네이션 타입 =====
export type TGetPartiesResponse = {
	parties: TParty[];
	total: number;
	page: number;
	limit: number;
};

export type IPartiesResponse = {
	parties: TParty[];
	total: number;
	page: number;
	limit: number;
	hasNext: boolean;
	hasPrev: boolean;
};

// ===== 필터 및 검색 관련 타입 =====
export type TFilterOptions = {
	type: string;
	value: string | number | null;
	label: string;
};

export type TGetPartiesPayload = {
	filterOptions: TFilterOptions[];
	pagination: {
		page: number;
		limit: number;
	};
};

// ===== 파티 생성 관련 타입 =====
export type TPartyCreateRequest = {
	title: string;
	gameId: number | undefined;
	purposeTag: string;
	maxParticipants: number;
	description: string;
	isPrivate: boolean;
	accessCode: string;
	gameUsername: string;
	profileId: number | null;
};

export type TPartyCreateFormErrors = {
	title: string;
	gameUsername: string;
	gameId: string;
	accessCode: string;
	description: string;
	maxParticipants: string;
};

// ===== API 응답 타입 =====
export type TPartyCreateSuccessResponse = {
	message: string;
	partyId: number;
};

export type TBadRequestResponse = {
	statusCode: number;
	message: string;
	error: string;
};

export type TBadAuthResponse = {
	statusCode: number;
	message: string;
	error: string;
};

// ===== 파티 관리 액션 파라미터 타입 =====
export type TChangePartyLeaderParams = {
	partyId: number;
	userId: number;
};

export type TBanPartyMemberParams = {
	partyId: number;
	userId: number;
};

export type TGetUserGameProfilesQuery = {
	userId: number;
	gameId?: number;
};

export type TPartyDisbandParams = {
	partyId: number;
};

export type TPartyCompleteParams = {
	partyId: number;
};

// ===== 모달 관련 타입 =====
export type TPartyFormFlow = 'form' | 'success' | 'failed';

export type TPartyModalType =
	| 'create'
	| 'join'
	| 'leaderChange'
	| 'memberBan'
	| 'memberLike'
	| 'partyDisband'
	| 'partyComplete'
	| '';

export type TCreatePartyData = null; // 'create' 타입은 추가 데이터가 필요 없음
export type TJoinPartyData = { partyId: number; isPrivate: boolean };
export type TMemberBanData = { partyId: number; userId: number; userName: string };
export type TLeaderChangeData = { partyId: number; userId: number; userName?: string };
export type TMemberLikeData = { partyId: number; userId: number; userName?: string };
export type TPartyDisbandData = { partyId: number };
export type TPartyCompleteData = { partyId: number };

export interface ModalPayloadMap {
	'': null;
	create: null;
	join: TJoinPartyData;
	memberBan: TMemberBanData;
	leaderChange: TLeaderChangeData;
	memberLike: TMemberLikeData;
	partyDisband: TPartyDisbandData;
	partyComplete: TPartyCompleteData;
}

// ai 도움좀 받았습니다... 머리가 굳어가네요
// 맵을 이용해 모든 경우의 수를 포함하는 단일 유니온 타입을 생성
export type TModalState = {
	// ModalPayloadMap의 모든 키(K)에 대해 반복
	[K in keyof ModalPayloadMap]: {
		type: K; // type은 반드시 키(K)와 같아야 하고,
		payload: ModalPayloadMap[K]; // payload는 K에 해당하는 값이어야 한다는 규칙 생성
	};
}[keyof ModalPayloadMap]; // 모든 생성된 객체 타입을 OR(|)로 묶음
