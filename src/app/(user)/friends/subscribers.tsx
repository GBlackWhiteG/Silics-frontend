'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { SubCard } from './subCard';
import { friendsService } from '@/services/subscribes.services';
import type { IFullUser } from '@/types/user.types';

export function Subscribers() {
	const [subscribers, setSubscribers] = useState<IFullUser[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const { ref, inView } = useInView();
	const ids = useRef(new Set<number>());

	const loadMoreSubsribers = async () => {
		const response = (await friendsService.getSubscribers(page)).data;
		const newSubs = response.data.filter(sub => !ids.current.has(sub.id));
		setSubscribers(prev => [...prev, ...newSubs]);
		setPage(prev => prev + 1);
		setHasMore(response.meta.current_page < response.meta.last_page);

		newSubs.forEach(sub => {
			ids.current.add(sub.id);
		});
	};

	useEffect(() => {
		if (inView) {
			loadMoreSubsribers();
		}
	}, [inView]);

	return (
		<div>
			<h2 className='mb-1'>Подписчики</h2>
			<ul className='flex flex-col gap-1'>
				{subscribers.length > 0 ? (
					subscribers.map(subscriber => (
						<SubCard
							key={subscriber.id}
							user={subscriber}
						/>
					))
				) : (
					<span className='text-gray-500 text-sm'>Нет подписчиков</span>
				)}
			</ul>
			<div ref={ref}></div>
		</div>
	);
}
