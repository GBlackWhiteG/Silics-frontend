import axios, { type CreateAxiosDefaults } from 'axios';
import Cookies from 'js-cookie';

import { API_URL } from '@/constants/constants';

import { publicPage } from '@/config/public-page.config';

import { EnumTokens } from '@/enums/auth.enums';
import { authServices } from '@/services/auth.services';

const options: CreateAxiosDefaults = {
	baseURL: API_URL,
	withCredentials: true,
};

export const axiosClassic = axios.create(options);

export const instance = axios.create(options);

instance.interceptors.request.use(config => {
	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

instance.interceptors.response.use(
	response => response,
	async error => {
		if (error.response && error.response.status === 401) {
			try {
				const response = await authServices.refresh().then(res => res);
				authServices.saveTokenStorage(response.data.accessToken);

				await fetch('/api/set-token', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ token: response.data.accessToken }),
				});

				return instance(error.response.request);
			} catch (error) {
				if (typeof window !== undefined) {
					authServices.removeFromStorage();
					import('next/router').then(router => {
						router.default.push(publicPage.AUTH);
					});
				} else {
					throw new Error(`Redirect:${publicPage.AUTH}`);
				}
				return Promise.reject(error);
			}
		}

		return Promise.reject(error);
	},
);
