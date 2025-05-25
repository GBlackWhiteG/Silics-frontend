import type { IPostFull } from '@/types/post.types';

const defaultState = {
	post: {} as IPostFull,
};

interface PostState {
	post: IPostFull;
}

interface PostAction {
	type: string;
	payload: IPostFull;
}

const SET_CHANGED_POST = 'SET_CHANGED_POST';

export const changedPostReducer = (state: PostState = defaultState, action: PostAction) => {
	switch (action.type) {
		case SET_CHANGED_POST:
			return { post: action.payload };
		default:
			return state;
	}
};

export const setChangedPostAction = (payload: IPostFull) => ({ type: SET_CHANGED_POST, payload });
