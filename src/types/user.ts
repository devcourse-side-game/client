export interface IMenuItem {
	menuTitle: string;
	path: string;
}

export type TUser = {
	id: number;
	username: string;
	email: string;
	profileImage: string | null;
};
