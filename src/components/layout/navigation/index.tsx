'use client';

import Cookies from 'js-cookie';
import { LogIn, LogOut, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { publicPage } from '@/config/public-page.config';

import { removeAuthAction } from '@/store/authReducer';
import { setSearchResultsAction } from '@/store/searchResultsReducer';

import styles from './Navigation.module.css';
import { EnumTokens } from '@/enums/auth.enums';
import { searchService } from '@/services/search.services';

export function Navigation() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const router = useRouter();
	const pathname = usePathname();
	const dispatch = useDispatch();

	useEffect(() => {
		const token = Cookies.get(EnumTokens.ACCESS_TOKEN);
		if (token) {
			setIsAuthenticated(true);
		}
	});

	const logoutHandle = () => {
		Cookies.remove(EnumTokens.ACCESS_TOKEN, { path: '/' });
		setIsAuthenticated(false);
		dispatch(removeAuthAction());
		setTimeout(() => {
			router.push(publicPage.AUTH);
		}, 100);
	};

	const searchPosts = async () => {
		if (!searchQuery) {
			if (pathname === publicPage.NEWS) return;
			router.push(publicPage.NEWS);
			return;
		}
		const response = await searchService.search(searchQuery);
		dispatch(setSearchResultsAction(response.data));
		router.push('/search');
	};

	const handlerSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			searchPosts();
		}
	};

	return (
		<nav className={styles.navigation}>
			<div className='container'>
				<section className={styles.navigationContentWrapper}>
					<div className={styles.wrapperLogo}>
						<Link href={publicPage.NEWS}>
							<Image
								src='/logo.svg'
								alt='logo'
								width={80}
								height={32}
								className='min-w-[80px]'
							/>
						</Link>
					</div>
					<div className={styles.searchInput}>
						<Search
							size={20}
							onClick={searchPosts}
							className='absolute left-3 top-[50%] translate-y-[-50%] text-gray-400 cursor-pointer'
						/>
						<input
							type='search'
							placeholder='Поиск'
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
							onKeyDown={handlerSearch}
							className='w-full bg-transparent border-radius-none pl-11 py-2'
						/>
					</div>
					{isAuthenticated ? (
						<LogOut
							onClick={logoutHandle}
							className='cursor-pointer min-w-[24px] md:min-w-none'
						/>
					) : (
						<Link href={publicPage.AUTH}>
							<LogIn className='min-w-[24px] md:min-w-none' />
						</Link>
					)}
				</section>
			</div>
		</nav>
	);
}
