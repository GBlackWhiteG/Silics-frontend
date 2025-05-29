import type { Metadata } from 'next';

import { CodeField } from './codeField';
import { Drafts } from './drafts';
import { Terminal } from './terminal';

export const metadata: Metadata = {
	title: 'Песочница',
	description: '',
};

export default function Code() {
	return (
		<section className='w-full grid grid-cols-[1fr_80px] gap-4'>
			<div className='grid grid-cols-2 mb-2'>
				<CodeField />
				<Terminal />
			</div>
			<Drafts />
		</section>
	);
}
