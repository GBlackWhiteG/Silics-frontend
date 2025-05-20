import type { Metadata } from 'next';

import { PostInput } from '@/components/ui/postInput';

import { Profile } from './profile';
import { UserPosts } from './userPosts';

export const metadata: Metadata = {
	title: 'Профиль',
	description: '',
};

export default async function Page({ params }: { params: { id: number } }) {
	const id = params.id;

	return (
		<section className='flex flex-col gap-4'>
			<Profile id={id} />
			<PostInput />
			<UserPosts id={id} />
		</section>
	);
}
