import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { Email2fa } from './email2fa';

export const metadata: Metadata = {
	title: 'Подтвердите почту',
	...NO_INDEX_PAGE,
};

export default function Page() {
	return <Email2fa />;
}
