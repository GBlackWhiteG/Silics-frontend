import Image from 'next/image';

import { UserAvatar } from '@/components/ui/userAvatar';

import { ProfileButtons } from './profileButtons';
import { userServices } from '@/services/user.services';

export async function Profile({ id }: { id: number }) {
	const profileData = (await userServices.getProfileServer({ id })).data;

	return (
		<div className='items flex flex-col gap-4'>
			<div>
				<UserAvatar
					userAvatarUrl={profileData.avatar_url}
					userName={profileData.name}
					avatarWidth={150}
				/>
			</div>
			<div className='flex justify-between items-end'>
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
				</div>
				<div>
					<ProfileButtons
						id={profileData.id}
						isSub={profileData.is_subscribed}
					/>
				</div>
			</div>
		</div>
	);
}
