'use client';

import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { getTimeString } from '@/utils/transform-words';

import styles from './News.module.css';
import { ubuntu } from '@/app/fonts/fonts';
import { postsService } from '@/services/post.services';
import type { IPostFull } from '@/types/post.types';
import { Heart, MessageSquare } from 'lucide-react';
import { Post } from './post';

export const Posts = () => {
	const [posts, setPosts] = useState<IPostFull[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await postsService.getPosts();
				setPosts(response.data);
			} catch (error) {
				setIsError(true);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPosts();
	}, []);

	return (
		<>
			{posts.map(post => (
				<Post key={post.id} {...post} />
			))}
		</>
	);
};
