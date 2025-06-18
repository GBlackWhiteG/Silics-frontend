const defaultState = {
	notification: false as boolean,
};

interface NotificationState {
	notification: boolean;
}

interface NotificationAction {
	type: string;
	payload: boolean;
}

const TOGGLE_NOTIFICATONS = 'SHOW_NOTIFICATONS';

export const notificationBarReducer = (
	state: NotificationState = defaultState,
	action: NotificationAction,
) => {
	switch (action.type) {
		case TOGGLE_NOTIFICATONS:
			return { notification: !state.notification };
		default:
			return state;
	}
};

export const toggleNotificationShow = () => ({
	type: TOGGLE_NOTIFICATONS,
});
