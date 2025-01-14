import { instance } from '@/api/axios';

import type { IUser } from '@/types/user.types';

class UserServices {
	private _AUTH = '/auth';

	async getProfile() {
		const response = instance.post<IUser>(`${this._AUTH}/me`);

		return response;
	}
}

export const userServices = new UserServices();
