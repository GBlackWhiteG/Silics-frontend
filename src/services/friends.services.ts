import { instance } from '@/api/axios';

import type { IUsers } from '@/types/user.types';

class FriendsService {
	private _USERS = '/users';

	async getFriends() {
		return instance.get<IUsers>(this._USERS);
	}
}

export const friendsService = new FriendsService();
