'use client'
import Link from "next/link";
import styles from './Sidebar.module.css';

export function Sidebar() {
    return (
        <article className={`${styles.sidebar} sidebars`}>
            <ul className={styles.items}>
                <li className={styles.item}><Link href="/profile">Профиль</Link></li>
                <li className={styles.item}><Link href="/news">Новости</Link></li>
                <li className={styles.item}><Link href="/messenger">Сообщения</Link></li>
                <li className={styles.item}><Link href="/friends">Друзья</Link></li>
                <li className={styles.item}><Link href="/code">Код</Link></li>
                <li className={styles.item}><Link href="/settings">Настройки</Link></li>
            </ul>
        </article>
    );
}