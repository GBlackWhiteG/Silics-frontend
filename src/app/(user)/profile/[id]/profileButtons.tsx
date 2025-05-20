'use client';

import { useSelector } from 'react-redux';

import { Button, ButtonLink, ButtonSkeleton } from '@/components/ui/buttons';

import { publicPage } from '@/config/public-page.config';

import type { RootState } from '@/store';

export function ProfileButtons({ id, isSub }: { id: number; isSub: boolean }) {
	const userId = useSelector((state: RootState) => state.auth.auth.id);

	return (
		<>
			{userId === undefined ? (
				<ButtonSkeleton />
			) : userId === id ? (
				<ButtonLink
					text={'Редактировать'}
					href={publicPage.SETTINGS}
				/>
			) : isSub ? (
				<Button text={'Отписаться'} />
			) : (
				<Button text={'Подписаться'} />
			)}
		</>
	);
}
