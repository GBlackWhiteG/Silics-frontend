import type { DeletedIdAction, DeletedIdState } from '@/types/deletedId.types';

const defaultState = {
	id: null as number | null,
};

const SET_COMMNET_ID = 'SET_COMMNET_ID';

export const deletedCommentIdReducer = (
	state: DeletedIdState = defaultState,
	action: DeletedIdAction,
) => {
	switch (action.type) {
		case SET_COMMNET_ID:
			return { id: action.payload };
		default:
			return state;
	}
};

export const setDeletedCommentIdAction = (payload: number) => ({ type: SET_COMMNET_ID, payload });
