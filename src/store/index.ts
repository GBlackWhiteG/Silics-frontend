import { combineReducers, createStore } from 'redux';

import { authReducer } from './authReducer';
import { changedCommentReducer } from './changedCommentReducer';
import { changedPostReducer } from './changedPostReducer';
import { codeDraftReducer } from './codeDraftReducer';
import { codeReducer } from './codeRunReducer';
import { codeShareReducer } from './codeShareReducer';
import { deletedCommentIdReducer } from './deletedCommentIdReducer';
import { deletedPostIdReducer } from './deletedPostIdReducer';
import { executorReducer } from './executerReducer';
import { newCommentReducer } from './newCommentReducer';
import { searchRecucer } from './searchResultsReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	code: executorReducer,
	copiedCode: codeReducer,
	sharedCode: codeShareReducer,
	searchResults: searchRecucer,
	deletedPostId: deletedPostIdReducer,
	deletedCommentId: deletedCommentIdReducer,
	newComment: newCommentReducer,
	changedPost: changedPostReducer,
	draftedCode: codeDraftReducer,
	changedComment: changedCommentReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
