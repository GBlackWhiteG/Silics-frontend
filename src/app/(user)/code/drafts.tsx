'use client';

import { useEffect, useState } from 'react';

export function Drafts() {
	const [drafts, setDrafts] = useState<{ name: string; lang: string; code: string }[]>([]);

	const draft = [
		{
			name: 'Draft 1',
			lang: 'python',
			code: 'print("Draft 1")',
		},
		{
			name: 'Draft 2',
			lang: 'javascript',
			code: 'console.log("Draft 2")',
		},
	];
	localStorage.setItem('drafts', JSON.stringify(draft));

	useEffect(() => {
		setDrafts(JSON.parse(localStorage.getItem('drafts') || ''));
	}, []);

	return (
		<div>
			<div className='items !p-4'>
				<ul className='flex flex-col gap-2'>
					{drafts.map((draft, index) => (
						<li
							key={index}
							className='w-full flex items-center justify-center aspect-square border-var(--primary) rounded-md cursor-pointer'
						>
							{draft.name}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
