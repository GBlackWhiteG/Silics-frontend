import type { Metadata } from 'next';

import { Personal } from './personal';

export const metadata: Metadata = {
	title: 'Настройки',
	description: '',
};

export default function Settings() {
	return (
		<section className='items'>
			<Personal />
		</section>
	);
}
