import type { Metadata } from 'next';

import styles from './News.module.css';
import { Posts } from './posts';
import { PostInput } from '@/app/(user)/news/postInput';

export const metadata: Metadata = {
	title: 'Новости',
};

export default function News() {
	return (
		<section className={styles.news}>
			<PostInput />
			<div className={styles.posts}>
				<Posts />
			</div>
		</section>
	);
}
