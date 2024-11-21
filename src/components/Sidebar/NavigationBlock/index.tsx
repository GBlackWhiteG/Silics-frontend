'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from './NavigationBlock.module.css';

export function NavigationBlock() {
    const pathname = usePathname();

    return (
        <div>
            <ul className={`${styles.items} sidebar-items`}>
                <div className={styles.wrapperItem}>
                    <li className={`${styles.item} ${pathname === '/profile' ? styles.active : ''}`}><Link href="/profile">Профиль</Link></li>
                    <li className={`${`${styles.item} ${pathname === '/news' ? styles.active : ''}`} ${pathname === '/news' ? styles.active : ''}`}><Link href="/news">Новости</Link></li>
                </div>
                <div className={styles.wrapperItem}>
                    <li className={`${styles.item} ${pathname === '/messenger' ? styles.active : ''}`}><Link href="/messenger">Сообщения</Link></li>
                    <li className={`${styles.item} ${pathname === '/friends' ? styles.active : ''}`}><Link href="/friends">Друзья</Link></li>
                </div>
                <div className={styles.wrapperItem}>
                    <li className={`${styles.item} ${pathname === '/code' ? styles.active : ''}`}><Link href="/code">Код</Link></li>
                </div>
                <div className={styles.wrapperItem}>
                    <li className={`${styles.item} ${pathname === '/settings' ? styles.active : ''}`}><Link href="/settings">Настройки</Link></li>
                </div>
            </ul>
        </div>
    );
}