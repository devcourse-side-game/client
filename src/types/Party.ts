//파티관련
export type Party = {
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
export type PartyListItemDetailProps = {
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
	members: PartyMember[];
};
export type PartyListItemProps = {
	party: Party;
};

// 파티게시판 멤버관련
export type PartyMember = {
	id: number;
	username: string;
	is_leader: boolean;
	joined_at: string;
};

export type PartyMemberListProps = {
	members: PartyMember[];
};
