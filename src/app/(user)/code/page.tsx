import type { Metadata } from 'next';

import styles from './Code.module.css';
import { Sandbox } from './sandbox';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: 'Песочница',
	description: '',
};

export default function Code() {
	return (
		<section className={`${styles.draftGrid} w-full gap-4`}>
			<Sandbox />
		</section>
	);
}
