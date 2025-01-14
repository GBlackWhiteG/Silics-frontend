import Link from 'next/link';

import styles from './Navigation.module.css';
import type { ISideBarNavigationItem } from './navigation.types';

interface Props {
	item: ISideBarNavigationItem;
	isActive?: boolean;
}

export function NavigationItem({ item, isActive }: Props) {
	return (
		<li
			key={item.link}
			className={styles.item}
		>
			<Link
				href={item.link}
				className={`${isActive ? styles.active : ''} ${styles.link}`}
			>
				<item.icon />
				<span>{item.label}</span>
			</Link>
			{item.isBottomBorder && <span className='h-[2px] block bg-gray-200 m-3' />}
		</li>
	);
}
