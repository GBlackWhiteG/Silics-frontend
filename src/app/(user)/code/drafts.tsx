'use client';

import { ArrowBigLeft, ArrowLeft, ChevronLeft, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setCodeDraftAction } from '@/store/codeDraftReducer';

import type { IDraft } from '@/types/draft.types';

export function Drafts({
	drafts,
	setDrafts,
}: {
	drafts: IDraft[];
	setDrafts: React.Dispatch<React.SetStateAction<IDraft[]>>;
}) {
	const dispatch = useDispatch();
	const [isDraftsOpen, setIsDraftsOpen] = useState(false);

	useEffect(() => {
		setDrafts(JSON.parse(localStorage.getItem('drafts') || '[]'));
	}, []);

	const handleDelete = (id: string) => {
		const updatedDrafts = drafts.filter(draft => draft.id !== id);
		localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
		setDrafts(updatedDrafts);
	};

	const sendCodeData = (code: string, language: string) => {
		const data = { code, language };
		dispatch(setCodeDraftAction(data));
	};

	return (
		<div
			className={`h-[75%] flex items-center transition absolute right-4 ${!isDraftsOpen && 'translate-x-[80%]'} md:relative md:top-0 md:right-0 md:translate-x-[0%] md:h-auto md:items-start`}
		>
			<div className='block md:hidden'>
				<ChevronLeft
					size={40}
					className={`opacity-10 transition ${isDraftsOpen && 'rotate-180'}`}
					onClick={() => setIsDraftsOpen(prev => !prev)}
				/>
			</div>
			<div
				className={`items h-full !p-4 transition opacity-0 md:h-auto md:opacity-100 ${isDraftsOpen && 'opacity-100'}`}
			>
				<span className='block mb-2'>Черновики</span>
				<ul className='flex flex-col gap-2'>
					{drafts.length > 0 ? (
						drafts.map((draft, index) => (
							<li
								key={index}
								className='w-full flex items-center justify-center border-var(--primary) rounded-md cursor-pointer relative transition group hover:shadow-[0_4px_20px_0_rgb(0,0,0,0.1)]'
								onClick={() => sendCodeData(draft.code, draft.lang)}
							>
								<span className='py-2'>{draft.lang}</span>
								<span className='absolute bottom-[-100%] right-[-10px] opacity-0 transition group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto'>
									{draft.name}
								</span>
								<div
									className='aspect-square rounded-full bg-red-500 p-1 absolute top-[-50%] left-[-1rem] translate-y-[50%] opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto'
									onClick={() => handleDelete(draft.id)}
								>
									<X
										size={16}
										className='text-white'
									/>
								</div>
							</li>
						))
					) : (
						<span className='text-sm text-gray-500'>Пусто</span>
					)}
				</ul>
			</div>
		</div>
	);
}
