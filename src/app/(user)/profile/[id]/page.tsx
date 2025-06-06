import type { Metadata } from 'next';

import { Notification } from '@/components/ui/notification';

import { Profile } from './profile';
import { UserPosts } from './userNews';
import { userServices } from '@/services/user.services';

type Props = {
	params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const profileData = (await userServices.getProfileServer({ id: Number(id) })).data;

	return {
		title: profileData.name,
		description: profileData.biography,
	};
}

export default async function Page({ params }: Props) {
	const { id } = await params;
	const profileData = (await userServices.getProfileServer({ id: Number(id) })).data;

	return (
		<section className='w-full grid grid-cols-[1fr_250px] gap-4'>
			<div className='flex flex-col gap-4'>
				<Profile profileData={profileData} />
				<UserPosts id={Number(id)} />
			</div>
			<Notification />
		</section>
	);
}
