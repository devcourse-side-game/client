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
