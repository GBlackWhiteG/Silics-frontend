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
			<div className='grid grid-cols-2 mb-2'>
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
