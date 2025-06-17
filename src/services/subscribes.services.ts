import { instance } from '@/api/axios';

import type { IUsers } from '@/types/user.types';

class FriendsService {
	async getSubscriptions(page: number) {
		return instance.get<IUsers>(`subscriptions?page=${page}`);
	}

	async getSubscribers(page: number) {
		return instance.get<IUsers>(`subscribers?page=${page}`);
	}

	async subscribe(id: number) {
		return instance.post(`subscribe/${id}`);
	}

	async unsubscribe(id: number) {
		return instance.post(`unsubscribe/${id}`);
	}
}

export const friendsService = new FriendsService();
