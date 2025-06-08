import type { Metadata } from 'next';

import { Notification } from '@/components/ui/notification';

import { SettingsList } from './settingsList';

export const metadata: Metadata = {
	title: 'Настройки',
	description: '',
};

export default function Settings() {
	return (
		<section className='w-full page-grid'>
			<SettingsList />
			<Notification />
		</section>
	);
}
