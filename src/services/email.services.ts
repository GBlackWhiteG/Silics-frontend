import Cookies from 'js-cookie';

import { axiosClassic } from '@/api/axios';

import { authServices } from './auth.services';
import { EnumTokens } from '@/enums/auth.enums';

class EmailServices {
	private _EMAIL = '/email';

	async verifyEmail(url: string) {
		const response = await axiosClassic.get<{ token: string; message: string }>(url);

		return response;
	}

	async verify2fa(code: string) {
		const response = await axiosClassic.post<{ token: string }>(`${this._EMAIL}/2fa`, {
			code: code,
		});

		return response;
	}

	removeFromStorage() {
		Cookies.remove(EnumTokens.ACCESS_TOKEN);
	}
}

export const emailServices = new EmailServices();
