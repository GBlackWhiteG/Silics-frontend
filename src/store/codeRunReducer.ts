import type { ICode } from '@/types/code.types';

const defaultState = {
	codeData: { code: '', language: '' } as ICode,
};

interface CodeState {
	codeData: ICode;
}

interface CodeAction {
	type: string;
	payload: ICode;
}

const SET_RUN_CODE = 'SET_RUN_CODE';
const CLEAR_RUN_CODE = 'CLEAR_RUN_CODE';

export const codeReducer = (state: CodeState = defaultState, action: CodeAction) => {
	switch (action.type) {
		case SET_RUN_CODE:
			return { codeData: action.payload };
		case CLEAR_RUN_CODE:
			return { codeData: { code: '', language: '' } };
		default:
			return state;
	}
};

export const setCodeRunAction = (payload: ICode) => ({ type: SET_RUN_CODE, payload });
export const clearCodeRunAction = () => ({ type: CLEAR_RUN_CODE });
