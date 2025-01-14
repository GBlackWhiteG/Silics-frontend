'use client';

import styles from './Sidebar.module.css';
import { Navigation } from './navigation';
import { SIDEBAR_NAVIGATION_DATA } from './navigation/navigation.data';
import { Profile } from './profile';

export function Sidebar() {
	return (
		<article className={`${styles.sidebar}`}>
			<Profile />
			<Navigation menu={SIDEBAR_NAVIGATION_DATA} />
		</article>
	);
}
