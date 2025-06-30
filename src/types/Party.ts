//파티관련
export type TParty = {
	id: number;
	title: string;
	game_id: number;
	//game_name: string;
	purposeTag: string;
	maxParticipants: number;
	//current_participants: number;
	//start_time: string;
	//end_time: string;
	isCompleted: boolean;
	isPrivate: boolean;
	creatorId: number;
	//creator_name: string;
	createdAt: string;
	updatedAt: string;
	description: string;
	accessCode: string | null;
};
// "id": 10,
//         "title": "파티 생성 테스트5",
//         "gameId": 5553,
//         "creatorId": 8,
//         "purposeTag": "친선전",
//         "maxParticipants": 5,
//         "description": "설명입니다",
//         "isPrivate": false,
//         "accessCode": null,
//         "isCompleted": false,
//         "createdAt": "2025-06-29T01:05:13.327Z",
//         "updatedAt": "2025-06-29T01:05:13.327Z"
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
export type TUser = {
	id: number;
	username: string;
	password: string;
	email: string;
	profileImage: string | null;
	createdAt: string;
	updatedAt: string;
};
export type TPartyListItemDetailResponse = {
	id: number;
	title: string;
	gameId: number;
	game: TGame;
	creator: TUser;
	purposeTag: string;
	maxParticipants: number;
	//currentParticipants: number;
	startTime: string;
	//endTime: string;
	isCompleted: boolean;
	isPrivate: boolean;
	creator_id: number;
	creator_name: string;
	created_at: string;
	updated_at: string;
	description: string;
	members: TPartyMember[];
};
// {
//     "id": 10,
//     "title": "파티 생성 테스트5",
//     "gameId": 5553,
//     "creatorId": 8,
//     "purposeTag": "친선전",
//     "maxParticipants": 5,
//     "description": "설명입니다",
//     "isPrivate": false,
//     "accessCode": null,
//     "isCompleted": false,
//     "createdAt": "2025-06-29T01:05:13.327Z",
//     "updatedAt": "2025-06-29T01:05:13.327Z",
//     "game": {
//         "id": 5553,
//         "name": "Iron Grip Warlord Scorched Earth Trailer",
//         "platforms": "steam",
//         "steamAppId": 81712,
//         "bannerUrl": "https://cdn.cloudflare.steamstatic.com/steam/apps/81712/header.jpg",
//         "isActive": 1,
//         "createdAt": "2025-06-24T17:44:29.856Z",
//         "updatedAt": "2025-06-24T17:44:29.856Z",
//         "slug": "iron-grip-warlord-scorched-earth-trailer"
//     },
//     "creator": {
//         "id": 8,
//         "username": "testuser2",
//         "password": "$2b$10$Ifh7fAFU6A/Qm0bjTXrgFu5H5/d90U6NTF/PjZunbRS/cy38cT3ji",
//         "email": "testuser2@example.com",
//         "profileImage": null,
//         "createdAt": "2025-06-26T14:29:15.774Z",
//         "updatedAt": "2025-06-26T14:29:15.774Z"
//     },
//     "members": [
//         {
//             "id": 12,
//             "partyId": 10,
//             "userId": 8,
//             "user": {
//                 "id": 8,
//                 "username": "testuser2",
//                 "password": "$2b$10$Ifh7fAFU6A/Qm0bjTXrgFu5H5/d90U6NTF/PjZunbRS/cy38cT3ji",
//                 "email": "testuser2@example.com",
//                 "profileImage": null,
//                 "createdAt": "2025-06-26T14:29:15.774Z",
//                 "updatedAt": "2025-06-26T14:29:15.774Z"
//             },
//             "isLeader": true,
//             "joinedAt": "2025-06-29T01:05:13.334Z",
//             "leftAt": null
//         }
//     ]
// }

// 파티게시판 멤버관련
export type TPartyMember = {
	id: number;
	partyId: number;
	userId: number;
	user: TUser;
	isLeader: boolean;
	joinedAt: string;
	leftAt: string | null;
};

export type TGetPartiesResponse = {
	parties: TParty[];
	total: number;
	page: number;
	limit: number;
};

// 검색 옵션
export type TFilterOptions = {
	type: string;
	value: string | number | null;
	label: string;
};

// 새로운 페이로드 타입 추가
export type TPartiesPayload = {
	filterOptions: TFilterOptions[];
	pagination: {
		page: number;
		limit: number;
	};
};

// API 응답 타입 수정
export type IPartiesResponse = {
	parties: TParty[];
	total: number;
	page: number;
	limit: number;
	hasNext: boolean;
	hasPrev: boolean;
};

// gameOptions 배열에 있는 객체의 타입 정의
export type TOptionGame = {
	id: number;
	title: string;
	category: string;
};

// 파티 생성 리퀘스트
export type TPartyCreateRequest = {
	title: string;
	gameId: number | undefined;
	purposeTag: string;
	maxParticipants: number;
	startTime: string;
	endTime: string;
	description: string;
	isPrivate: boolean;
	accessCode: string;
};

// 파티 생성 실패 응답
export type TPartyCreateSuccessResponse = {
	message: string;
	partyId: number;
};

//파티 생성 성공 응답
export type TBadRequestResponse = {
	statusCode: number;
	message: string;
	error: string;
};

//인증 실패 응답
export type TBadAuthResponse = {
	statusCode: number;
	message: string;
	error: string;
};

/**  */
export type TPartyFormFlow = 'form' | 'success';

export type TPartyModalType = 'create' | 'join' | 'leaderChange' | 'memberBan' | 'memberLike' | '';

// 모달에 필요한 데이터 타입들
export type TCreatePartyData = null; // 'create' 타입은 추가 데이터가 필요 없음
export type TJoinPartyData = { partyId: number };
export type TMemberBanData = { partyId: number; userId: number; userName: string };
export type TLeaderChangeData = { partyId: number; userId: number; userName?: string };
export type TMemberLikeData = { partyId: number; userId: number; userName?: string };

export interface ModalPayloadMap {
	'': null;
	create: null;
	join: TJoinPartyData;
	memberBan: TMemberBanData;
	leaderChange: TLeaderChangeData;
	memberLike: TMemberLikeData;
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
