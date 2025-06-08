import { usePathname } from 'next/navigation';

import styles from './Navigation.module.css';
import { NavigationItem } from './NavigationItem';
import type { ISideBarNavigationItem } from './navigation.types';

interface Props {
	menu: ISideBarNavigationItem[];
}

export function Navigation({ menu }: Props) {
	const pathname = usePathname();

	return (
		<ul className={`${styles.items} sidebar-items`}>
			{menu.map(item => {
				const isMatch = new RegExp(`^${item.link}(/\\d+)?$`).test(pathname);

				return (
					<NavigationItem
						key={item.link}
						item={item}
						isActive={isMatch}
					/>
				);
			})}
		</ul>
	);
}
