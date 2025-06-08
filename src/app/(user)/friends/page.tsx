import type { Metadata } from 'next';

import { Notification } from '@/components/ui/notification';

import { SubsList } from './subsList';

export const metadata: Metadata = {
	title: 'Подписки',
};

export default function Friends() {
	return (
		<section className='w-full page-grid gap-4'>
			<SubsList />
			<Notification />
		</section>
	);
}
