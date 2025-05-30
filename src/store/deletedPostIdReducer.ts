import type { DeletedIdAction, DeletedIdState } from '@/types/deletedId.types';

const defaultState = {
	id: null as number | null,
};

const SET_POST_ID = 'SET_POST_ID';

export const deletedPostIdReducer = (
	state: DeletedIdState = defaultState,
	action: DeletedIdAction,
) => {
	switch (action.type) {
		case SET_POST_ID:
			return { id: action.payload };
		default:
			return state;
	}
};

export const setDeletedPostIdAction = (payload: number) => ({ type: SET_POST_ID, payload });
