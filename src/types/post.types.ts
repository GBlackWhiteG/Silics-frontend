import type { IFile } from './file.types';
import type { IMeta, IPaginateLinks } from './pagination.types';

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
	user_id: number;
	user_name: string;
	likes: number;
	liked_by_user: boolean;
	comments_count: number;
}

export interface IPosts {
	data: IPostFull[];
	links: IPaginateLinks;
	meta: IMeta;
}
