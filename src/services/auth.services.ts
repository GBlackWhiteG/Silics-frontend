import Cookies from 'js-cookie';

import { axiosClassic, instance } from '@/api/axios';

import { EnumTokens } from '@/enums/auth.enums';
import type { IAuth, IRegister } from '@/types/auth.types';
import type { IUser } from '@/types/user.types';

class AuthServices {
	private _AUTH = '/auth';

	async register(data: IRegister) {
		return await axiosClassic.post(`${this._AUTH}/register`, data);
	}

	async login(data: IAuth) {
		return await axiosClassic.post(`${this._AUTH}/login`, data);
	}

	async getMe() {
		try {
			return await instance.post<IUser>(`${this._AUTH}/me`);
		} catch (e) {
			console.log(e);
		}
	}

	async changePassword(
		id: number,
		data: { old_password: string; new_password: string; new_password_confirmation: string },
	) {
		return instance.post(`${this._AUTH}/change-password/${id}`, data);
	}

	async logout() {
		const response = await axiosClassic.post<{ message: string }>(`${this._AUTH}/logout`);

		if (response.data) {
			this.removeFromStorage();

			await fetch('/api/remove-token', {
				method: 'POST',
			});
		}

		return response;
	}

	async refresh() {
		return await instance.post(`${this._AUTH}/refresh`);
	}

	saveTokenStorage(accessToken: string) {
		Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
			sameSite: 'lax',
			expires: 1,
		});
	}

	removeFromStorage() {
		Cookies.remove(EnumTokens.ACCESS_TOKEN);
	}
}

export const authServices = new AuthServices();
