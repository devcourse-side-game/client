import { IPartyListItem, TUserGameProfile } from './party';
import { TGame } from './game';

export interface Response {
	message: string;
	statusCode?: string;
	errors?: string;
	detaul?: string;
	errorCode: string;
}

export interface LoginResponse extends Response {
	accessToken: string;
}

export interface RefreshResponse extends Response {
	accessToken: string;
}

export interface IUserDataResponse extends Response {
	id: number;
	email: string;
	password: string;
	username: string;
	createdAt: Date;
}

// 게임 목록 조회 응답
export type TGetGameListResponse = TGame[];

// 파티 목록 조회 응답
export type IPartiesResponse = IPartyListItem[];

// 파티 참가 응답
export interface IJoinPartyResponse extends Response {
	message: string;
	partyId: number;
}

// 게임 상세 조회 응답
export type TGameDetailResponse = Response & TGame[];

//유저 게임 프로필 조회
export type TGetUserGameProfilesResponse = TUserGameProfile[];
