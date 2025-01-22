import { instance } from "@/api/axios";
import type { IUser } from "@/types/user.types";

class FriendsService {
	private _USERS = '/users';

	async getFriends() {
		return instance.get<IUser[]>(this._USERS);
	}
}

export const friendsService = new FriendsService();
