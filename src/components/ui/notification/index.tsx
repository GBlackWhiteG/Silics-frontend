'use client';

import Cookies from 'js-cookie';
import Echo from 'laravel-echo';
import Link from 'next/link';
import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { publicPage } from '@/config/public-page.config';

import { UserAvatar } from '../userAvatar';

import { EnumTokens } from '@/enums/auth.enums';
import { notificationService } from '@/services/notification.service';
import type { RootState } from '@/store';
import type { IPostNotification } from '@/types/notification.types';

declare global {
	interface Window {
		Pusher: typeof Pusher;
		Echo: Echo<any>;
	}
}

export function Notification() {
	const [echo, setEcho] = useState<Echo<any> | null>(null);

	useEffect(() => {
		window.Pusher = Pusher;
		const echoInstance = new Echo({
			broadcaster: 'reverb',
			key: 'hftflka8arwo3bbhzmjm',
			wsHost: '82.202.131.212',
			wsPort: 8080,
			forceTLS: false,
			disableStats: true,
			encrypted: false,
			authEndpoint: 'http://82.202.131.212:8876/api' + '/broadcasting/auth',
			auth: {
				headers: {
					Authorization: 'Bearer ' + Cookies.get(EnumTokens.ACCESS_TOKEN),
					Accept: 'application/json',
				},
			},
		});

		setEcho(echoInstance);

		return () => {
			echoInstance.disconnect();
		};
	}, []);

	const userId = useSelector((state: RootState) => state.auth.auth.id);

	const [notifications, setNotifications] = useState<IPostNotification[]>([]);

	const getNotifications = async (id: number) => {
		const response = (await notificationService.getNotifications(id)).data;
		setNotifications(response);
	};

	useEffect(() => {
		if (!echo || userId === undefined) return;
		echo.private(`notification.${userId}`).listen('LikeEvent', (notif: IPostNotification) => {
			setNotifications(prev => [notif, ...prev]);
		});

		echo
			.private(`notification.${userId}`)
			.listen('UnlikeEvent', (deletedNotif: { id: number; userId: number }) => {
				setNotifications(prev => prev.filter(notif => notif.id !== deletedNotif.id));
			});

		echo.private(`notification.${userId}`).listen('AddCommentEvent', (notif: IPostNotification) => {
			setNotifications(prev => [notif, ...prev]);
		});

		echo
			.private(`notification.${userId}`)
			.listen('RemoveCommentEvent', (deletedNotif: { id: number; userId: number }) => {
				setNotifications(prev => prev.filter(notif => notif.id !== deletedNotif.id));
			});

		getNotifications(userId);

		return () => {
			echo.disconnect();
		};
	}, [echo, userId]);

	return (
		<article className={`sidebar-items`}>
			<h2 className='mx-2'>Уведомления</h2>
			<ul className='flex flex-col gap-2 mt-2'>
				{notifications.length > 0 ? (
					notifications.map(item => (
						<li
							key={item.id}
							className='grid grid-cols-[30px_auto] gap-2 items-center text-xs text-gray-500 p-2 cursor-pointer rounded-md transition hover:shadow-[0_4px_20px_0_rgb(0,0,0,0.1)]'
						>
							<UserAvatar
								userAvatarUrl={item.likedUserAvatar}
								userName={'avatar'}
								avatarWidth={30}
							/>
							<Link href={`${publicPage.PROFILE}/${item.likedUserId}`}>{item.message}</Link>
						</li>
					))
				) : (
					<span className='text-sm text-gray-500 mx-2'>Пусто</span>
				)}
			</ul>
		</article>
	);
}
