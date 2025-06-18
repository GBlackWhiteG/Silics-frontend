'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';

import { PostInput } from '@/components/ui/postInput';

import { Posts } from '../../(news)/posts';

import { postsService } from '@/services/post.services';
import type { RootState } from '@/store';
import type { IPostFull } from '@/types/post.types';

export function UserPosts({ id }: { id: number }) {
	const authId = useSelector((state: RootState) => state.auth.auth.id);
	const changedPostData = useSelector((state: RootState) => state.changedPost.post);
	const deletedPostId = useSelector((state: RootState) => state.deletedPostId.id);

	const [posts, setPosts] = useState<IPostFull[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const { ref, inView } = useInView();
	const ids = useRef(new Set<number>());

	const [newPost, setNewPost] = useState<IPostFull | null>(null);

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
		if (newPost) {
			const post = {
				...newPost,
				likes: 0,
			} as IPostFull;
			setPosts(prev => [post, ...prev]);
			ids.current.add(post.id);
		}
	}, [newPost]);

	const loadMorePosts = async () => {
		if (hasMore) {
			const response = (await postsService.getUserPosts(id, page)).data;
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
		<>
			{authId == id && <PostInput stateNewPost={(post: IPostFull) => setNewPost(post)} />}
			{posts.length > 0 ? <Posts posts={posts} /> : <span className='text-center'>Нет постов</span>}
			<div ref={ref}></div>
		</>
	);
}
