import Image from 'next/image';
import Link from 'next/link';

import { publicPage } from '@/config/public-page.config';

import styles from './Footer.module.css';

export function Footer() {
	return (
		<footer className={styles.footer}>
			<div className='container'>
				<section className={styles.wrapperFooter}>
					<Link href={publicPage.NEWS}>
						<Image
							src='/logo.svg'
							alt='logo'
							width={80}
							height={32}
							className='min-w-[80px]'
						/>
					</Link>
				</section>
			</div>
		</footer>
	);
}
