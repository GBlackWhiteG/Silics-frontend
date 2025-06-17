'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { publicPage } from '@/config/public-page.config';

import { setAuthAction } from '@/store/authReducer';

import styles from './Profile.module.css';
import { authServices } from '@/services/auth.services';
import type { RootState } from '@/store';

export function Profile() {
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const dispatch = useDispatch();
	const userData = useSelector((state: RootState) => state.auth.auth);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await authServices.getMe();
				if (response && response.data) dispatch(setAuthAction(response.data));
			} catch (error) {
				console.log(error);
				setIsError(true);
			}
		};

		if (Object.keys(userData).length === 0) fetchUserData();
	}, []);

	return (
		<Link href={`${publicPage.PROFILE}/${userData.id}`}>
			<div className={`${styles.profileBlock} sidebar-items`}>
				<div className={styles.wrapperImage}>
					<div className='w-[40px] rounded-full aspect-square overflow-hidden relative'>
						<Image
							src={userData.avatar_url || '/anonymous.jpg'}
							fill
							alt='user-avatar'
							className='object-cover'
						/>
					</div>
				</div>
				<div className='flex flex-col'>
					<span>{userData?.name}</span>
					<span className='text-sm text-gray-500'>@{userData?.nickname}</span>
				</div>
			</div>
		</Link>
	);
}
