import type { Metadata } from 'next';

import { CodeField } from './codeField';
import { Drafts } from './drafts';
import { Sandbox } from './sandbox';
import { Terminal } from './terminal';

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
