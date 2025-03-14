import axios, { type CreateAxiosDefaults } from 'axios';
import Cookies from 'js-cookie';

import { API_URL } from '@/constants/constants';

import { EnumTokens } from '@/enums/auth.enums';

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
