import type { IFile } from './file.types';
import type { IUser } from './user.types';

export interface IComment {
	id: number;
	user_id: number;
	post_id: number;
	content: string;
	code: string;
	prog_language: string;
	files: IFile[];
	posted_ago: number;
	created_at: string;
	updated_at: string;
	user: IUser;
}
