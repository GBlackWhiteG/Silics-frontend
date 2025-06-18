'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, ButtonLink, ButtonSkeleton } from '@/components/ui/buttons';

import { publicPage } from '@/config/public-page.config';

import { adminService } from '@/services/admin.service';
import { friendsService } from '@/services/subscribes.services';
import type { RootState } from '@/store';

export function ProfileButtons({
	id,
	isSubscribed,
	isBlocked,
}: {
	id: number;
	isSubscribed: boolean;
	isBlocked: boolean;
}) {
	const [isSub, setIsSub] = useState(isSubscribed);
	const userId = useSelector((state: RootState) => state.auth.auth.id);
	const userRole = useSelector((state: RootState) => state.auth.auth.role);
	const [isBlock, setIsBlock] = useState(isBlocked);

	const subscribeHandler = async () => {
		const response = await friendsService.subscribe(id);
		if (response.status === 200) {
			setIsSub(true);
		}
	};

	const unsubscribeHandler = async () => {
		const response = await friendsService.unsubscribe(id);
		if (response.status === 200) {
			setIsSub(false);
		}
	};

	const blockedToggleHandler = async () => {
		const response = await adminService.blockToggleUser(id);
		if (response.status === 200) {
			setIsBlock(prev => !prev);
		}
	};

	const deleteUser = async () => {
		const response = await adminService.deleteUser(id);
		if (response.status === 200) {
			window.location.href = publicPage.PROFILE;
		}
	};

	return (
		<div className='flex flex-col gap-2'>
			{userId === undefined ? (
				<ButtonSkeleton />
			) : userId === id ? (
				<ButtonLink
					text={'Редактировать'}
					href={publicPage.SETTINGS}
				/>
			) : isSub ? (
				<Button
					text={'Отписаться'}
					onClick={unsubscribeHandler}
				/>
			) : (
				<Button
					text={'Подписаться'}
					onClick={subscribeHandler}
				/>
			)}

			{userRole === 'admin' && userId !== id && (
				<>
					<Button
						text={isBlock ? 'Разблокировать' : 'Заблокировать'}
						isInverted={true}
						onClick={blockedToggleHandler}
					/>
					{isBlock && (
						<Button
							text={'Удалить'}
							onClick={deleteUser}
						/>
					)}
				</>
			)}
		</div>
	);
}
