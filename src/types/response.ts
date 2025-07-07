import { TParty } from './Party';

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
	email: string;
	password: string;
	username: string;
	createdAt: Date;
}

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

export type IPartiesResponse = TParty[];
