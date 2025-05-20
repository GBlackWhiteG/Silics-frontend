import Link from 'next/link';

import { Button } from '@/components/ui/buttons';
import { UserAvatar } from '@/components/ui/userAvatar';

import { publicPage } from '@/config/public-page.config';

import type { IFullUser } from '@/types/user.types';

export function FriendCard({ user }: { user: IFullUser }) {
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
				<div className='flex flex-col justify-between'>
					<span>{user.name}</span>
					<span className='text-gray-500 text-sm'>@{user.nickname}</span>
				</div>
			</Link>
			<div className='flex flex-col'>
				<span>Подписчиков: {user.subscribers_count}</span>
				<span>Подписок: {user.subscriptions_count}</span>
			</div>
			{user.is_subscribed ? (
				<Button
					text={'Отписаться'}
					className='m-1'
				/>
			) : (
				<Button
					text={'Подписаться'}
					className='m-1'
				/>
			)}
		</li>
	);
}
