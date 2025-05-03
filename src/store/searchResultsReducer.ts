import type { IPostFull } from '@/types/post.types';

const defaultState = {
	data: [] as IPostFull[],
};

interface ResultsState {
	data: IPostFull[];
}

interface ResultsAction {
	type: string;
	payload: IPostFull[];
}

const SET_RESULTS = 'SET_RESULTS';

export const searchRecucer = (state: ResultsState = defaultState, action: ResultsAction) => {
	switch (action.type) {
		case SET_RESULTS:
			return { data: action.payload };
		default:
			return state;
	}
};

export const setSearchResultsAction = (payload: IPostFull) => ({ type: SET_RESULTS, payload });
