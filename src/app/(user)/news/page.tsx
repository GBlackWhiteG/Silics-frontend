import type { Metadata } from 'next';

import { News } from './news';

export const metadata: Metadata = {
	title: 'Новости',
};

export default function Page() {
	return <News />;
}
