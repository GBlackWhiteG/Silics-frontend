import { NavigationBlock } from "./NavigationBlock";
import { ProfileBlock } from "./ProfileBlock";
import styles from './Sidebar.module.css';

export function Sidebar() {
    return (
        <article className={`${styles.sidebar}`}>
            <ProfileBlock />
            <NavigationBlock />
        </article>
    );
}