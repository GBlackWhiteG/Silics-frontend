import type { IComment } from '@/types/comment.types';

const defaultState = {
	comment: {} as IComment,
};

interface CommentState {
	comment: IComment;
}

interface CommentAction {
	type: string;
	payload: IComment;
}

const SET_NEW_COMMENT = 'SET_NEW_COMMENT';

export const newCommentReducer = (state: CommentState = defaultState, action: CommentAction) => {
	switch (action.type) {
		case SET_NEW_COMMENT:
			return { comment: action.payload };
		default:
			return state;
	}
};

export const addNewCommentAction = (payload: IComment) => ({ type: SET_NEW_COMMENT, payload });
