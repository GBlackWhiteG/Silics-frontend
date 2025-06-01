import type { Metadata } from 'next';

import { Notification } from '@/components/ui/notification';

import { News } from './news';

export const metadata: Metadata = {
	title: 'Новости',
};

export default function Page() {
	return (
		<div className='w-full grid grid-cols-[1fr_250px] gap-4'>
			<News />
			<Notification />
		</div>
	);
}
