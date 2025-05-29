import type { Metadata } from 'next';

import { SubsList } from './subsList';

export const metadata: Metadata = {
	title: 'Подписки',
};

export default function Friends() {
	return (
		<section className='w-full grid grid-cols-[1fr_250px] gap-4'>
			<SubsList />
			<article className={`sidebar-items`}>
				<h2>Уведомления</h2>
				<ul>
					<li></li>
				</ul>
			</article>
		</section>
	);
}
