'use client';

import { CircleUserRound, Code, Contact, MessageCircle, Newspaper, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

import type { ISideBarNavigationItem } from '@/components/layout/sidebar/navigation/navigation.types';

import { publicPage } from '@/config/public-page.config';

import styles from './Sidebar.module.css';
import { Navigation } from './navigation';
import { Profile } from './profile';
import type { RootState } from '@/store';

export function Sidebar() {
	const pathname = usePathname();
	const userData = useSelector((state: RootState) => state.auth.auth);

	const SIDEBAR_NAVIGATION_DATA: ISideBarNavigationItem[] = [
		{
			icon: CircleUserRound,
			label: 'Профиль',
			link: `${publicPage.PROFILE}/${userData.id}`,
		},
		{
			icon: Newspaper,
			label: 'Лента',
			link: publicPage.NEWS,
			// isBottomBorder: true,
		},
		// {
		// 	icon: MessageCircle,
		// 	label: 'Сообщения',
		// 	link: publicPage.MESSAGES,
		// },
		{
			icon: Contact,
			label: 'Подписки',
			link: publicPage.FRIENDS,
			isBottomBorder: true,
		},
		{
			icon: Code,
			label: 'Песочница',
			link: publicPage.CODE,
			isBottomBorder: true,
		},
		{
			icon: Settings,
			label: 'Настройки',
			link: publicPage.SETTINGS,
		},
	];

	return (
		<article className={`${styles.sidebar} ${pathname == publicPage.CODE && styles.miniSidebar}`}>
			<Profile />
			<Navigation menu={SIDEBAR_NAVIGATION_DATA} />
		</article>
	);
}
