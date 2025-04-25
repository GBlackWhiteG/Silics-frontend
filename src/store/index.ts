import { combineReducers, createStore } from 'redux';

import { authReducer } from './authReducer';
import { codeReducer } from './codeReducer';
import { executorReducer } from './executerReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	code: executorReducer,
	copiedCode: codeReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
