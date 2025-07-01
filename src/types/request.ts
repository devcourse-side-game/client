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
	limit: number;
	page: number;
	isactive?: boolean;
	platform?: string;
	search?: string;
}

export interface IJoinPartyRequest {
	partyId: number;
}
