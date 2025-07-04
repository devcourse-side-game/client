import { TGame, TParty, TUserGameProfile } from './Party';

export interface Response {
	message: string;
	statusCode?: string;
	error?: string;
	errorCode: string;
}

export interface LoginResponse extends Response {
	accessToken?: string;
}

// export interface SignupResponse extends Response {}

// export interface NicknameResponse extends Response {}

// 게임 목록 조회 응답
export type TGetGameListResponse = TGame[];

// 파티 목록 조회 응답
export type IPartiesResponse = TParty[];

// 파티 참가 응답
export interface IJoinPartyResponse extends Response {
	message: string;
	partyId: number;
}

// 게임 상세 조회 응답
export type TGameDetailResponse = TGame;

//유저 게임 프로필 조회
export type TGetUserGameProfilesResponse = TUserGameProfile[];
