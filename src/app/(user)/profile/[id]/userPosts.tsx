'use client';

import { useEffect, useState } from 'react';

import { Posts } from '../../news/posts';

import { postsService } from '@/services/post.services';
import type { IPostFull } from '@/types/post.types';

export function UserPosts({ id }: { id: number }) {
	const [posts, setPosts] = useState<IPostFull[]>([]);

	useEffect(() => {
		const getUserPosts = async () => {
			const response = (await postsService.getUserPosts(id)).data;
			setPosts(response.data);
		};

		getUserPosts();
	}, []);

	return <Posts posts={posts} />;
}
