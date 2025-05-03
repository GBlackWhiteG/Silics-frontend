'use client';

import { useSelector } from 'react-redux';

import { Posts } from '../posts';

import type { RootState } from '@/store';

export default function Page() {
	const searchResults = useSelector((state: RootState) => state.searchResults);
	console.log(searchResults.data);

	return (
		<section className='flex flex-column gap-1'>
			<div className='bg-[#fafafa]'>
				{searchResults.data.length === 0 ? (
					'По данному запросу ничего не найдено'
				) : (
					<Posts posts={searchResults.data} />
				)}
			</div>
		</section>
	);
}
