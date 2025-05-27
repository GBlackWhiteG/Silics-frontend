import type { Metadata } from 'next';

import { Profile } from './profile';
import { UserPosts } from './userNews';

export const metadata: Metadata = {
	title: 'Профиль',
	description: '',
};

export default async function Page({ params }: { params: { id: number } }) {
	const id = params.id;

	return (
		<section className='flex flex-col gap-4'>
			<Profile id={id} />
			<UserPosts id={id} />
		</section>
	);
}
