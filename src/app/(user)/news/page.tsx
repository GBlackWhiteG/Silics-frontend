import type { Metadata } from 'next';

import { News } from './news';

export const metadata: Metadata = {
	title: 'Новости',
};

export default function Page() {
	return (
		<div className='w-full grid grid-cols-[1fr_250px] gap-4'>
			<News />
			<article className={`sidebar-items`}>
				<h2>Уведомления</h2>
				<ul>
					<li></li>
				</ul>
			</article>
		</div>
	);
}
