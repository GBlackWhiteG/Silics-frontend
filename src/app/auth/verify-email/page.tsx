import type { Metadata } from 'next';
import { Suspense } from 'react';

import { Loader } from '@/components/ui/loader';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { VerifyEmail } from './verifyEmail';

export const metadata: Metadata = {
	title: 'Подтверждение почты',
	...NO_INDEX_PAGE,
};

export default function Page() {
	return (
		<Suspense fallback={<Loader />}>
			<VerifyEmail />
		</Suspense>
	);
}
