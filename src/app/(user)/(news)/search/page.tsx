'use client';

import { useSelector } from 'react-redux';

import { Notification } from '@/components/ui/notification';

import { Posts } from '../posts';

import type { RootState } from '@/store';

export default function Page() {
	const searchResults = useSelector((state: RootState) => state.searchResults);

	return (
		<section className='w-full page-grid'>
			<div className='bg-[#fafafa]'>
				{searchResults.data.length === 0 ? (
					'По данному запросу ничего не найдено'
				) : (
					<Posts posts={searchResults.data} />
				)}
			</div>
			<Notification />
		</section>
	);
}
