'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

import { API_URL } from '@/constants/constants';

import { EnumTokens } from '@/enums/auth.enums';

export const instanceServer = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

instanceServer.interceptors.request.use(async config => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get(EnumTokens.ACCESS_TOKEN)?.value;

	if (accessToken && config.headers) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});
