import type { IUser } from './user.types';

export interface IComment {
	id: number;
	user_id: number;
	post_id: number;
	content: string;
	code: string;
	created_at: string;
	updated_at: string;
	user: IUser;
}
