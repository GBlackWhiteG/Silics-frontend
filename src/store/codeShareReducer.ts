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

const SET_CODE = 'SET_CODE';
const CLEAR_CODE = 'CLEAR_CODE';

export const codeShareReducer = (state: CodeState = defaultState, action: CodeAction) => {
	switch (action.type) {
		case SET_CODE:
			console.log('share');
			return { codeData: action.payload };
		case CLEAR_CODE:
			console.log('clear');
			return { codeData: { code: '', language: '' } };
		default:
			return state;
	}
};

export const setCodeShareAction = (payload: ICode) => ({ type: SET_CODE, payload });
export const clearCodeShareAction = () => ({ type: CLEAR_CODE });
