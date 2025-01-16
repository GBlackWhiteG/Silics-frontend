'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { publicPage } from '@/config/public-page.config';

import styles from './Profile.module.css';
import { userServices } from '@/services/user.services';
import type { IUser } from '@/types/user.types';

export function Profile() {
	const [userData, setUserData] = useState<IUser>();
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const printMe = async () => {
		const response = await userServices.getProfile();
	};

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await userServices.getProfile();
				setUserData(response.data);
			} catch (error) {
				setIsError(true);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserData();
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
