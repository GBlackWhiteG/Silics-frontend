import type { Metadata } from 'next';

import { Notification } from '@/components/ui/notification';

import styles from './News.module.css';
import { News } from './news';

export const metadata: Metadata = {
	title: 'Новости',
};

export default function Page() {
	return (
		<div className={`w-full page-grid gap-4`}>
			<News />
			<Notification />
		</div>
	);
}
