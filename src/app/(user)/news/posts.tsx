'use client';

import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { getTimeString } from '@/utils/transform-datetime';

import styles from './News.module.css';
import { ubuntu } from '@/app/fonts/fonts';
import { postsService } from '@/services/post.services';
import type { Post } from '@/types/post.types';

export const Posts = () => {
	const [posts, setPosts] = useState<Post[]>([]);
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
				<div
					key={post.id}
					className={styles.post}
				>
					<div className={styles.userInfo}>
						<div className={styles.imageWrapper}>
							<Image
								src='/anonymous.jpg'
								width={40}
								height={40}
								alt='user-avatar'
							></Image>
						</div>
						<div className={styles.infoWrapper}>
							<span>{post.user_name}</span>
							<span>
								{post.posted_ago >= 60
									? `${Math.floor(post.posted_ago / 60)}
                  ${getTimeString(Math.floor(post.posted_ago / 60), ['час', 'часа', 'часов'])}
                  назад`
									: `${
											post.posted_ago === 0
												? `Только что`
												: `${post.posted_ago} ${getTimeString(post.posted_ago, ['минуту', 'минуты', 'минут'])} назад`
										}`}
							</span>
						</div>
					</div>
					<h3 className={ubuntu.className}>{post.title}</h3>
					<p>{post.description}</p>
					{/* <img src={post.image} alt={post.title} /> */}
				</div>
			))}
		</>
	);
};
