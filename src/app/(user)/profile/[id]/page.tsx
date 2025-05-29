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
		<section className='w-full grid grid-cols-[1fr_250px] gap-4'>
			<div className='flex flex-col gap-4'>
				<Profile id={id} />
				<UserPosts id={id} />
			</div>
			<article className={`sidebar-items`}>
				<h2>Уведомления</h2>
				<ul>
					<li></li>
				</ul>
			</article>
		</section>
	);
}
