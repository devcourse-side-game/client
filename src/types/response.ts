import { TGame, TParty } from './Party';

export interface Response {
	message: string;
	statusCode?: string;
	error?: string;
}

export interface LoginResponse extends Response {
	accessToken?: string;
}

// export interface SignupResponse extends Response {}

// export interface NicknameResponse extends Response {}

export type TGetGameListResponse = TGame[];

export type IPartiesResponse = TParty[];

export interface IJoinPartyResponse extends Response {
	message: string;
	partyId: number;
}
