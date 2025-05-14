export interface DeletedIdState {
	id: number | null;
}

export interface DeletedIdAction {
	type: string;
	payload: number;
}
