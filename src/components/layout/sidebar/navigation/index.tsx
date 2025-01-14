import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';

import styles from './Navigation.module.css';
import { NavigationItem } from './NavigationItem';
import type { ISideBarNavigationItem } from './navigation.types';

interface Props {
	menu: ISideBarNavigationItem[];
}

export function Navigation({ menu }: Props) {
	const pathname = usePathname();

	return (
		<div>
			<ul className={`${styles.items} sidebar-items`}>
				{menu.map(item => (
					<NavigationItem
						key={item.link}
						item={item}
						isActive={!!match(item.link)(pathname)}
					/>
				))}
			</ul>
		</div>
	);
}
