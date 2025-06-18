import { Bell } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { toggleNotificationShow } from '@/store/notificationBarReducer';

import styles from './Navigation.module.css';
import { NavigationItem } from './NavigationItem';
import type { ISideBarNavigationItem } from './navigation.types';

interface Props {
	menu: ISideBarNavigationItem[];
}

export function Navigation({ menu }: Props) {
	const pathname = usePathname();
	const dispatch = useDispatch();

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
			<li className={`${styles.item} justify-center flex xl:hidden`}>
				<div className={styles.link}>
					<Bell
						className='text-[#c4c5cc;]'
						onClick={() => dispatch(toggleNotificationShow())}
					/>
				</div>
			</li>
		</ul>
	);
}
