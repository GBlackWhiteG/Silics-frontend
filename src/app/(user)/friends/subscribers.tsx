'use client';

import { useEffect, useState } from 'react';

import { SubCard } from './subCard';
import { friendsService } from '@/services/subscribes.services';
import type { IFullUser } from '@/types/user.types';

export function Subscribers() {
	const [subscribers, setSubscribers] = useState<IFullUser[]>([]);

	const getSubsribers = async () => {
		const response = (await friendsService.getSubscribers()).data;
		setSubscribers(response.data);
	};

	useEffect(() => {
		getSubsribers();
	}, []);

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
		</div>
	);
}
