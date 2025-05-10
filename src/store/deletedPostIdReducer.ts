const defaultState = {
	id: null as number | null,
};

interface PostIdState {
	id: number | null;
}

interface PostIdAction {
	type: string;
	payload: number;
}

const SET_POST_ID = 'SET_POST_ID';

export const deletedPostIdReducer = (state: PostIdState = defaultState, action: PostIdAction) => {
	switch (action.type) {
		case SET_POST_ID:
			return { id: action.payload };
		default:
			return state;
	}
};

export const setDeletedPostIdAction = (payload: number) => ({ type: SET_POST_ID, payload });
