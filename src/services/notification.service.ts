import { instance } from '@/api/axios';

class NotificationServices {
	private _NOTIFICATIONS = '/notifications';

	async getNotifications(id: number) {
		return instance.get(`${this._NOTIFICATIONS}/${id}`);
	}
}

export const notificationService = new NotificationServices();
