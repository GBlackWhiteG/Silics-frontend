import type { IMeta, IPaginateLinks } from './pagination.types';

export interface IUser {
	id: number;
	name: string;
	nickname: string;
	email: string;
	avatar_url: string;
	role: string;
	is_blocked: boolean;
	email_verified_at: string;
	created_at: string;
	updated_at: string;
}

export interface IFullUser extends IUser {
	biography: string;
	subscribers_count: number;
	subscriptions_count: number;
	is_subscribed: boolean;
	is_enabled_two_fa: boolean;
}

export interface IUsers {
	data: IFullUser[];
	links: IPaginateLinks;
	meta: IMeta;
}
