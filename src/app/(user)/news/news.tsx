'use client';

import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';

import { PostInput } from '@/components/ui/postInput';

import styles from './News.module.css';
import { Posts } from './posts';
import { postsService } from '@/services/post.services';
import type { RootState } from '@/store';
import type { IPostFull } from '@/types/post.types';

export function News() {
	const [posts, setPosts] = useState<IPostFull[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const { ref, inView } = useInView();

	const [sortedBy, setSortedBy] = useState('created_at');

	const [newPost, setNewPost] = useState<IPostFull | null>(null);

	const deletedPostId = useSelector((state: RootState) => state.deletedPostId.id);

	useEffect(() => {
		const post = {
			...newPost,
			likes: 0,
		} as IPostFull;
		if (post) {
			setPosts(prev => [post, ...prev]);
		}
	}, [newPost]);

	useEffect(() => {
		if (deletedPostId) {
			setPosts(prev => prev.filter(post => post.id !== deletedPostId));
		}
	}, [deletedPostId]);

	useEffect(() => {
		setPosts([]);
		setPage(1);
		setHasMore(true);
	}, [sortedBy]);

	const loadMorePosts = async () => {
		if (hasMore) {
			const response = (await postsService.getPosts(page, sortedBy)).data;
			setPosts(prev => [...prev, ...response.data]);
			setPage(prev => prev + 1);
			setHasMore(response.meta.current_page < response.meta.last_page);
		}
	};

	useEffect(() => {
		if (inView) {
			loadMorePosts();
		}
	}, [inView]);

	return (
		<section className={styles.news}>
			<PostInput stateNewPost={(post: IPostFull) => setNewPost(post)} />
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
			<div ref={ref}></div>
		</section>
	);
}
