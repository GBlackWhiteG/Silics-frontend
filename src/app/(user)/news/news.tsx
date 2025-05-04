'use client';

import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { PostInput } from '@/components/ui/postInput';

import styles from './News.module.css';
import { Posts } from './posts';
import { postsService } from '@/services/post.services';
import type { IPost, IPostFull } from '@/types/post.types';

export function News() {
	const [posts, setPosts] = useState<IPostFull[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const [sortedBy, setSortedBy] = useState('created_at');

	const [newPost, setNewPost] = useState<IPost | null>(null);
	const loader = useRef<HTMLDivElement | null>(null);
	const isFetching = useRef(false);

	// TODO: поменять логику добавления нового поста
	useEffect(() => {
		setPage(1);
		setPosts([]);
		setHasMore(true);
	}, [newPost, sortedBy]);

	useEffect(() => {
		const load = async () => {
			if (isLoading || !hasMore) return;
			setIsLoading(true);

			try {
				const res = (await postsService.getPosts(page, sortedBy)).data;
				setPosts(prev => [...prev, ...res.data]);
				setHasMore(res.meta.current_page < res.meta.last_page);
			} catch (err) {
				console.log(err);
			} finally {
				setIsLoading(false);
				isFetching.current = false;
			}
		};

		load();
	}, [page]);

	useEffect(() => {
		const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
			const entry = entries[0];
			if (entry.isIntersecting && hasMore && !isLoading && !isFetching.current) {
				isFetching.current = true;
				setPage(prev => prev + 1);
			}
		});

		if (loader.current) {
			observer.observe(loader.current);
		}

		return () => {
			if (loader.current) observer.unobserve(loader.current);
		};
	}, [hasMore, isLoading]);

	return (
		<section className={styles.news}>
			<PostInput stateNewPost={(post: IPost) => setNewPost(post)} />
			<div className='flex justify-end gap-1 text-sm'>
				<span>Сортировка по:</span>
				<select
					className='bg-transparent cursor-pointer'
					value={sortedBy}
					onChange={e => setSortedBy(e.target.value)}
				>
					<option value='created_at'>новым</option>
					<option value='likes'>лучшим</option>
				</select>
			</div>
			<div className={styles.posts}>
				<Posts posts={posts} />
			</div>
			<div ref={loader}></div>
		</section>
	);
}
