'use client';

import { useEffect, useState } from 'react';

import { SubCard } from './subCard';
import { friendsService } from '@/services/subscribes.services';
import type { IFullUser } from '@/types/user.types';

export function Subscriptions() {
	const [subscriptions, setSubscriptions] = useState<IFullUser[]>([]);

	const getSubscriptions = async () => {
		const response = (await friendsService.getSubscriptions()).data;
		setSubscriptions(response.data);
	};

	useEffect(() => {
		getSubscriptions();
	}, []);

	return (
		<div className='mt-2'>
			<h2 className='mb-1'>Подписки</h2>
			<ul className='flex flex-col gap-1'>
				{subscriptions.length > 0 ? (
					subscriptions.map(subscription => (
						<SubCard
							key={subscription.id}
							user={subscription}
						/>
					))
				) : (
					<span className='text-gray-500 text-sm'>Нет подписок</span>
				)}
			</ul>
		</div>
	);
}
