import type { IAttachment } from './attachment.types';
import type { IFile } from './file.types';
import type { IMeta, IPaginateLinks } from './pagination.types';

export interface IPost {
	title?: string;
	description?: string;
	code?: string;
	prog_language?: string;
	files?: IFile[];
	attachments?: IAttachment[];
}

export interface IPostFull extends IPost {
	id: number;
	created_at: string;
	user_id: number;
	user_name: string;
	user_avatar: string;
	likes: number;
	liked_by_user: boolean;
	comments_count: number;
}

export interface IPosts {
	data: IPostFull[];
	links: IPaginateLinks;
	meta: IMeta;
}
