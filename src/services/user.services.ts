import { instance } from '@/api/axios';
import { instanceServer } from '@/api/axios-server';

import type { IFullUser } from '@/types/user.types';

class UserServices {
	private _USERS = '/users';

	async getProfile({ id }: { id: number }) {
		const response = instance.get<IFullUser>(`${this._USERS}/${id}`);

		return response;
	}

	async getProfileServer({ id }: { id: number }) {
		const response = instanceServer.get<IFullUser>(`${this._USERS}/${id}`);

		return response;
	}

	async changeProfile(id: number, data: FormData) {
		const response = instance.post(`${this._USERS}/${id}`, data);

		return response;
	}
}

export const userServices = new UserServices();
