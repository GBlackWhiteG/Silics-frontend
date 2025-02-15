import type { IComment } from './comment.types';
import type { IFile } from './file.types';

export interface IPost {
	title?: string;
	description?: string;
	code?: string;
	prog_language?: string;
	files?: IFile[];
}

export interface IPostFull extends IPost {
	id: number;
	posted_ago: number;
	user_name: string;
	likes: number;
	liked_by_user: boolean;
	comments_count: number;
	comments?: IComment[];
}
