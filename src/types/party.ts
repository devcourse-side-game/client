import { TGame } from './game';
import { TUser } from './user';

// ===== 파티 기본 타입 =====
export interface IPartyBase {
	id: number;
	title: string;
	gameId: number;
	createdAt: string;
	updatedAt: string;
	description: string;
	isCompleted: boolean;
	isPrivate: boolean;
	accessCode: string | null;
	creatorId: number;
	purposeTag: string;
	maxParticipants: number;
}
export type TLeader = {
	userId: number;
	username: string;
	gameUsername: string;
};
export interface IPartyListItem extends IPartyBase {
	leader: TLeader;
	gameBannerUrl: string;
	currentMemberCount: number;
}
export type TPartyMember = {
	id: number;
	userId: number;
	username: string;
	isLeader: boolean;
	joinedAt: string;
	leftAt: string | null;
	gameUsername: string;
};
export interface IPartyDetail extends IPartyBase {
	creator: TUser;
	game: TGame;
	members: TPartyMember[];
}

// ===== 사용자 관련 타입 =====

export type TOptionGame = {
	id: number;
	title: string;
	category: string;
};

export type TUserGameProfile = {
	id: number | null;
	userId: number;
	gameId: number | null;
	gameUsername: string;
	game: TGame | null;
};
// ===== 필터 및 검색 관련 타입 =====
export type TFilterOption = {
	type: string;
	value: string | number;
	label: string;
};

export type TPagination = {
	page: number;
	limit: number;
};

export interface IGetPartiesData {
	filterOptions: TFilterOption[];
	pagination: TPagination;
}

// ===== 파티 생성 관련 타입 =====
type TPartyAutoGenerateInfo = 'id' | 'createdAt' | 'updatedAt' | 'isCompleted' | 'creatorId';
export type TCreatePartyInfo = Omit<IPartyBase, TPartyAutoGenerateInfo>;
export interface ICreatePartyPayload extends TCreatePartyInfo {
	gameUsername: string;
	profileId: number | null;
}

export type TCreatePartyValidationFormErrors = {
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

export type TLeavePartyParams = {
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
	| 'leaveParty'
	| '';

export type TCreatePartyData = null; // 'create' 타입은 추가 데이터가 필요 없음
export type TJoinPartyData = { partyId: number; isPrivate: boolean };
export type TMemberBanData = { partyId: number; userId: number; userName: string };
export type TLeaderChangeData = { partyId: number; userId: number; userName?: string };
export type TMemberLikeData = { partyId: number; userId: number; userName?: string };
export type TPartyDisbandData = { partyId: number };
export type TPartyCompleteData = { partyId: number };
export type TLeavePartyData = {
	partyId: number;
	partyTitle: string;
};

export interface ModalPayloadMap {
	'': null;
	create: null;
	join: TJoinPartyData;
	memberBan: TMemberBanData;
	leaderChange: TLeaderChangeData;
	memberLike: TMemberLikeData;
	partyDisband: TPartyDisbandData;
	partyComplete: TPartyCompleteData;
	leaveParty: TLeavePartyData;
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

// tab 타입
export enum TTabType {
	MY_PARTIES = 0,
	PARTY_FINDER = 1,
}
