'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/buttons';

import { Subscribers } from './subscribers';
import { Subscriptions } from './subscriptions';

export function SubsList() {
	const [isSubscriptions, setIsSubscriptions] = useState(true);

	return (
		<div className='items flex flex-col gap-6'>
			<div className='flex flex-col gap-2 sm:flex-row'>
				<Button
					text={'Подписки'}
					className='w-full'
					isInverted={!isSubscriptions}
					onClick={() => setIsSubscriptions(true)}
				/>
				<Button
					text={'Подписчики'}
					className='w-full'
					isInverted={isSubscriptions}
					onClick={() => setIsSubscriptions(false)}
				/>
			</div>
			<div>{isSubscriptions ? <Subscriptions /> : <Subscribers />}</div>
		</div>
	);
}
