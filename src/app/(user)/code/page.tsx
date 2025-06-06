import type { Metadata } from 'next';

import { Sandbox } from './sandbox';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: 'Песочница',
	description: '',
};

export default function Code() {
	return (
		<section className='w-full grid grid-cols-[1fr_120px] gap-4'>
			<Sandbox />
		</section>
	);
}
