import { TParty } from './Party';

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

export interface IGame {
	id: number;
	name: string;
	platform: string;
	steamAppId: number;
	bannerUrl: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	slug: string;
}
export interface GetGameListResponse extends Response {
	games: IGame[];
}
