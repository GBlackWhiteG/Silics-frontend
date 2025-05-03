import type { IExecutedCode } from '@/types/execution.types';

const defaultState = {
	result: { code_result: '>', execution_time: undefined } as IExecutedCode,
};

interface ExecutorState {
	result: IExecutedCode;
}

interface ExecutorAction {
	type: string;
	payload?: IExecutedCode;
}

const SET_CODE = 'SET_CODE';
const CLEAR_CODE = 'CLEAR_CODE';

export const executorReducer = (state: ExecutorState = defaultState, action: ExecutorAction) => {
	switch (action.type) {
		case SET_CODE:
			return { result: action.payload };
		case CLEAR_CODE:
			return { result: { code_result: '>', execution_time: undefined } as IExecutedCode };
		default:
			return state;
	}
};

export const setExecutedCodeAction = (payload: IExecutedCode) => ({ type: SET_CODE, payload });
export const clearExecutedCodeAction = () => ({ type: CLEAR_CODE });
