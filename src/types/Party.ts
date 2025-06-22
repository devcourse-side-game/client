//파티관련
export type TParty = {
	id: number;
	title: string;
	game_id: number;
	game_name: string;
	purpose_tag: string;
	max_participants: number;
	current_participants: number;
	start_time: string;
	end_time: string;
	is_completed: boolean;
	is_private: boolean;
	creator_id: number;
	creator_name: string;
	created_at: string;
	updated_at: string;
};
export type TPartyListItemDetailResponse = {
	id: number;
	title: string;
	game_id: number;
	game_name: string;
	purpose_tag: string;
	max_participants: number;
	current_participants: number;
	start_time: string;
	end_time: string;
	is_completed: boolean;
	is_private: boolean;
	creator_id: number;
	creator_name: string;
	created_at: string;
	updated_at: string;
	description: string;
	members: TPartyMember[];
};

// 파티게시판 멤버관련
export type TPartyMember = {
	id: number;
	username: string;
	is_leader: boolean;
	joined_at: string;
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
export type TPartyListFilterOptions = {
	options: TFilterOptions[];
};

// gameOptions 배열에 있는 객체의 타입 정의
export type TOptionGame = {
	id: number;
	title: string;
	category: string;
};
