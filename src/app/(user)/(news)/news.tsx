'use client';

import { useEffect, useRef, useState } from 'react';
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
	const ids = useRef(new Set<number>());

	const [sortedBy, setSortedBy] = useState('created_at');

	const [newPost, setNewPost] = useState<IPostFull | null>(null);

	const changedPostData = useSelector((state: RootState) => state.changedPost.post);
	const deletedPostId = useSelector((state: RootState) => state.deletedPostId.id);

	useEffect(() => {
		const post = {
			...newPost,
			likes: 0,
		} as IPostFull;
		if (post) {
			setPosts(prev => [post, ...prev]);
			ids.current.add(post.id);
		}
	}, [newPost]);

	useEffect(() => {
		if (changedPostData) {
			setPosts(prev => prev.map(post => (post.id === changedPostData.id ? changedPostData : post)));
		}
	}, [changedPostData]);

	useEffect(() => {
		if (deletedPostId) {
			setPosts(prev => prev.filter(post => post.id !== deletedPostId));
			ids.current.delete(deletedPostId);
		}
	}, [deletedPostId]);

	useEffect(() => {
		setPosts([]);
		setPage(1);
		setHasMore(true);
		ids.current.clear();
	}, [sortedBy]);

	const loadMorePosts = async () => {
		if (hasMore) {
			const response = (await postsService.getPosts(page, sortedBy)).data;
			const newPosts = response.data.filter(post => !ids.current.has(post.id));
			setPosts(prev => [...prev, ...newPosts]);
			setPage(prev => prev + 1);
			setHasMore(response.meta.current_page < response.meta.last_page);

			newPosts.forEach(post => {
				ids.current.add(post.id);
			});
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
