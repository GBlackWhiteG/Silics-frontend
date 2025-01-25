import type { IComment } from './comment.types';
import type { IFile } from './file.types';

export interface IPost {
	title?: string;
	description?: string;
	files?: IFile[];
}

export interface IPostFull extends IPost {
	id: number;
	posted_ago: number;
	user_name: string;
	likes: number;
	comments: IComment[];
}
