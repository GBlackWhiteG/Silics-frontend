'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/buttons';
import { UserAvatar } from '@/components/ui/userAvatar';

import { publicPage } from '@/config/public-page.config';

import { friendsService } from '@/services/subscribes.services';
import type { IFullUser } from '@/types/user.types';

export function SubCard({ user }: { user: IFullUser }) {
	const [isSub, setIsSub] = useState(user.is_subscribed);

	const subscribeHandler = async () => {
		const response = await friendsService.subscribe(user.id);
		if (response.status === 200) {
			setIsSub(true);
		}
	};

	const unsubscribeHandler = async () => {
		const response = await friendsService.unsubscribe(user.id);
		if (response.status === 200) {
			setIsSub(false);
		}
	};

	return (
		<li className='w-full flex justify-between rounded-[0.5rem] p-2 hover:bg-gray-100'>
			<Link
				href={`${publicPage.PROFILE}/${user.id}`}
				className='flex gap-2'
			>
				<UserAvatar
					userAvatarUrl={user.avatar_url}
					userName={user.name}
					avatarWidth={50}
				/>
				<div className='flex flex-col justify-center'>
					<span>{user.name}</span>
					<span className='text-gray-500 text-sm'>@{user.nickname}</span>
				</div>
			</Link>
			<div className='flex flex-col'>
				<span className='text-gray-500'>Подписчиков: {user.subscribers_count}</span>
				<span className='text-gray-500'>Подписок: {user.subscriptions_count}</span>
			</div>
			{isSub ? (
				<Button
					text={'Отписаться'}
					className='m-1'
					onClick={unsubscribeHandler}
				/>
			) : (
				<Button
					text={'Подписаться'}
					className='m-1'
					onClick={subscribeHandler}
				/>
			)}
		</li>
	);
}
