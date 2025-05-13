export interface IPaginateLinks {
	first: string;
	last?: string;
	prev?: string;
	next: string;
}

export interface IMeta {
	current_page: number;
	last_page: number;
}
