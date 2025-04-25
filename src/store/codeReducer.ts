const defaultState = {
	code: '' as string,
};

interface CodeState {
	code: string;
}

interface CodeAction {
	type: string;
	payload: string;
}

const SET_CODE = '';
const CLEAR_CODE = '';

export const codeReducer = (state: CodeState = defaultState, action: CodeAction) => {
	switch (action.type) {
		case SET_CODE:
			return { code: action.payload };
		case CLEAR_CODE:
			return { code: '' };
		default:
			return state;
	}
};

export const setCodeAction = (payload: string) => ({ type: SET_CODE, payload });
export const clearCodeAction = () => ({ type: CLEAR_CODE });
