'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { General } from './general';
import { Personal } from './personal';
import { userServices } from '@/services/user.services';
import type { RootState } from '@/store';
import type { IFullUser } from '@/types/user.types';

export function SettingsList() {
	const userId = useSelector((state: RootState) => state.auth.auth.id);
	const [user, setUser] = useState<IFullUser | null>(null);

	useEffect(() => {
		const getProfileData = async () => {
			const response = (await userServices.getProfile({ id: userId })).data;
			setUser(response);
		};

		if (userId) getProfileData();
	}, [userId]);

	return (
		<div className='flex flex-col gap-4'>
			<General user={user} />
			<Personal user={user} />
		</div>
	);
}
