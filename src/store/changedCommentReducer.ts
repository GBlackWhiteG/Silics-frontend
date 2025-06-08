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

const SET_CHANGED_COMMENT = 'SET_CHANGED_COMMENT';

export const changedCommentReducer = (
	state: CommentState = defaultState,
	action: CommentAction,
) => {
	switch (action.type) {
		case SET_CHANGED_COMMENT:
			return { comment: action.payload };
		default:
			return state;
	}
};

export const setChangedCommentAction = (payload: IComment) => ({
	type: SET_CHANGED_COMMENT,
	payload,
});
