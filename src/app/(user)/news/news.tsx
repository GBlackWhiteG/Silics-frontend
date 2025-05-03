'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { PostInput } from '@/components/ui/postInput';

import styles from './News.module.css';
import { Posts } from './posts';
import { postsService } from '@/services/post.services';
import type { IPost, IPostFull } from '@/types/post.types';

export function News() {
	const [posts, setPosts] = useState<IPostFull[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const [sortedBy, setSortedBy] = useState('created_at');

	const [newPost, setNewPost] = useState<IPost | null>(null);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await postsService.getPosts(sortedBy);
				setPosts(response.data);
			} catch (error) {
				setIsError(true);
				toast.error('Ошибка загрузки постов');
			} finally {
				setIsLoading(false);
			}
		};

		fetchPosts();
	}, [newPost, sortedBy]);

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
		</section>
	);
}
