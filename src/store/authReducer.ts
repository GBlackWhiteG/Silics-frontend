import type { IUser } from '@/types/user.types';

const defaultState = {
	auth: {} as IUser,
};

interface AuthState {
	auth: IUser;
}

interface AuthAction {
	type: string;
	payload: IUser;
}

const SET_AUTH = 'SET_AUTH';
const REMOVE_AUTH = 'REMOVE_AUTH';

export const authReducer = (state: AuthState = defaultState, action: AuthAction) => {
	switch (action.type) {
		case SET_AUTH:
			return { auth: action.payload };
		case REMOVE_AUTH:
			return { auth: {} as IUser };
		default:
			return state;
	}
};

export const setAuthAction = (payload: IUser) => ({ type: SET_AUTH, payload });
export const removeAuthAction = () => ({ type: REMOVE_AUTH });
