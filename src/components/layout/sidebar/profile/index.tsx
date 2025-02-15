'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { publicPage } from '@/config/public-page.config';

import { setAuthAction } from '@/store/authReducer';

import styles from './Profile.module.css';
import { userServices } from '@/services/user.services';
import type { RootState } from '@/store';

export function Profile() {
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const dispatch = useDispatch();
	const userData = useSelector((state: RootState) => state.auth.auth);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await userServices.getProfile();
				dispatch(setAuthAction(response.data));
			} catch (error) {
				setIsError(true);
			} finally {
				setIsLoading(false);
			}
		};

		if (Object.keys(userData).length === 0) fetchUserData();
	}, []);

	return (
		<Link href={publicPage.PROFILE}>
			<div className={`${styles.profileBlock} sidebar-items`}>
				<div className={styles.wrapperImage}>
					<Image
						src='/anonymous.jpg'
						width={40}
						height={40}
						alt='user-avatar'
					/>
				</div>
				<div className='flex flex-col'>
					<span>{userData?.name}</span>
					<span className='text-sm text-gray-500'>@{userData?.nickname}</span>
				</div>
			</div>
		</Link>
	);
}
