import type { IComment } from './comment.types';

export interface IPost {
	id: number;
	title?: string;
	description?: string;
	posted_ago: number;
	likes: number;
	files?: string[];
	comments: IComment[];
	user_name: string;
}
