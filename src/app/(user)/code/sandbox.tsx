'use client';

import { useState } from 'react';

import { CodeField } from './codeField';
import { Drafts } from './drafts';
import { Terminal } from './terminal';
import type { IDraft } from '@/types/draft.types';

export function Sandbox() {
	const [drafts, setDrafts] = useState<IDraft[]>([]);

	return (
		<>
			<div className='flex flex-col gap-4 mb-2 xl:grid xl:grid-cols-2 xl:gap-0'>
				<CodeField
					drafts={drafts}
					setDrafts={setDrafts}
				/>
				<Terminal />
			</div>
			<Drafts
				drafts={drafts}
				setDrafts={setDrafts}
			/>
		</>
	);
}
