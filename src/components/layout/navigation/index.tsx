'use client';

import Cookies from 'js-cookie';
import { LogIn, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import styles from './Navigation.module.css';
import { EnumTokens } from '@/enums/auth.enums';

export function Navigation() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const token = Cookies.get(EnumTokens.ACCESS_TOKEN);
		if (token) {
			setIsAuthenticated(true);
		}
	});

	const logoutHandle = () => {
		Cookies.remove(EnumTokens.ACCESS_TOKEN, { path: '/' });
		setIsAuthenticated(false);
		setTimeout(() => {
			router.push('/');
		}, 100);
	};

	return (
		<nav className={styles.navigation}>
			<div className='container'>
				<section className={styles.navigationContentWrapper}>
					<div className={styles.wrapperLogo}>
						<Image
							src='/logo.svg'
							alt='logo'
							width={80}
							height={32}
						/>
					</div>
					<input
						type='search'
						placeholder='Поиск'
					/>
					{/* TODO: поиск по заголовкам */}
					{/* TODO: фильтрация по новые и лучшие (по лайкам) */}
					{isAuthenticated ? (
						<LogOut
							onClick={logoutHandle}
							className='cursor-pointer'
						/>
					) : (
						<Link href='/'>
							<LogIn />
						</Link>
					)}
				</section>
			</div>
		</nav>
	);
}
