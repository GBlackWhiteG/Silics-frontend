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

const SET_DRAFT_CODE = 'SET_DRAFT_CODE';
const CLEAR_DRAFT_CODE = 'CLEAR_DRAFT_CODE';

export const codeDraftReducer = (state: CodeState = defaultState, action: CodeAction) => {
	switch (action.type) {
		case SET_DRAFT_CODE:
			return { codeData: action.payload };
		case CLEAR_DRAFT_CODE:
			return { codeData: { code: '', language: '' } };
		default:
			return state;
	}
};

export const setCodeDraftAction = (payload: ICode) => ({ type: SET_DRAFT_CODE, payload });
export const clearCodeDraftAction = () => ({ type: CLEAR_DRAFT_CODE });
