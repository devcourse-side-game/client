export interface LoginRequest {
	email: string;
	password: string;
}

export interface SignupRequest {
	username: string;
	email: string;
	password: string;
}

export interface NicknameCheckRequest {
	username: string;
}

export interface GetGameListRequest {
	platform: string;
	isActive: boolean;
	limit: number;
	page: number;
	search: string;
}

export interface PagenationRequest {
	limit: number;
	page: number;
}

export interface IJoinPartyRequest {
	partyId: number;
}
