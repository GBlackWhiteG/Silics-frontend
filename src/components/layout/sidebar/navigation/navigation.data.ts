import { CircleUserRound, Code, Contact, MessageCircle, Newspaper, Settings } from 'lucide-react';

import type { ISideBarNavigationItem } from '@/components/layout/sidebar/navigation/navigation.types';

import { publicPage } from '@/config/public-page.config';

export const SIDEBAR_NAVIGATION_DATA: ISideBarNavigationItem[] = [
	{
		icon: CircleUserRound,
		label: 'Профиль',
		link: publicPage.PROFILE,
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
