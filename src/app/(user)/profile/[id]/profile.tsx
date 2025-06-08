import Image from 'next/image';

import { UserAvatar } from '@/components/ui/userAvatar';

import { ProfileButtons } from './profileButtons';
import type { IFullUser } from '@/types/user.types';

export async function Profile({ profileData }: { profileData: IFullUser }) {
	return (
		<div className='items flex flex-col gap-4'>
			<div>
				<UserAvatar
					userAvatarUrl={profileData.avatar_url}
					userName={profileData.name}
					avatarWidth={150}
				/>
			</div>
			<div className='flex justify-between items-stretch gap-2 flex-column flex-col md:items-end md:flex-row'>
				<div className='flex flex-col gap-1'>
					<span className='text-2xl'>{profileData.name}</span>
					<span className='text-gray-500'>@{profileData.nickname}</span>
					<div className='flex gap-4'>
						<span className='text-gray-500'>
							<b className='text-[--primary]'>{profileData.subscribers_count || 0}</b> подписчиков
						</span>
						<span className='text-gray-500'>
							<b className='text-[--primary]'>{profileData.subscriptions_count || 0}</b> подписок
						</span>
					</div>
					{profileData.biography && <p className='text-gray-500'>{profileData.biography}</p>}
				</div>
				<div>
					<ProfileButtons
						id={profileData.id}
						isSubscribed={profileData.is_subscribed}
						isBlocked={profileData.is_blocked}
					/>
				</div>
			</div>
		</div>
	);
}
