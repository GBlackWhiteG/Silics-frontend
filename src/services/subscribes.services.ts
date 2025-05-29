import { instance } from '@/api/axios';

import type { IUsers } from '@/types/user.types';

class FriendsService {
	async getSubscriptions() {
		return instance.get<IUsers>(`subscriptions`);
	}

	async getSubscribers() {
		return instance.get<IUsers>(`subscribers`);
	}

	async subscribe(id: number) {
		return instance.post(`subscribe/${id}`);
	}

	async unsubscribe(id: number) {
		return instance.post(`unsubscribe/${id}`);
	}
}

export const friendsService = new FriendsService();
