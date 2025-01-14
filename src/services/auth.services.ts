import Cookies from 'js-cookie';

import { axiosClassic } from '@/api/axios';

import { EnumTokens } from '@/enums/auth.enums';
import type { IAuth, IRegister } from '@/types/auth.types';

class AuthServices {
	private _AUTH = '/auth';

	async register() {}

	async login() {}

	async main(type: 'login' | 'register', data: IAuth | IRegister) {
		const response = await axiosClassic.post(`${this._AUTH}/${type}`, data);

		if (response.data) {
			this._saveTokenStorage(response.data.access_token);
		}

		return response;
	}

	async logout() {
		const response = await axiosClassic.post<{ message: string }>(`${this._AUTH}/logout`);

		if (response.data) {
			this.removeFromStorage();
		}

		return response;
	}

	private _saveTokenStorage(accessToken: string) {
		Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
			domain: 'localhost',
			sameSite: 'strict',
			expires: 1 / 24,
			secure: true,
		});
	}

	removeFromStorage() {
		Cookies.remove(EnumTokens.ACCESS_TOKEN);
	}
}

export const authServices = new AuthServices();
