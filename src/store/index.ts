import { combineReducers, createStore } from 'redux';

import { authReducer } from './authReducer';
import { codeReducer } from './codeRunReducer';
import { codeShareReducer } from './codeShareReducer';
import { executorReducer } from './executerReducer';
import { searchRecucer } from './searchResultsReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	code: executorReducer,
	copiedCode: codeReducer,
	sharedCode: codeShareReducer,
	searchResults: searchRecucer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
