import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/stackoverflow-light.css';
import { Heart, MessageSquare } from 'lucide-react';
import Image from 'next/image';

import { getTimeString } from '@/utils/transform-words';

import styles from './News.module.css';
import { ubuntu } from '@/app/fonts/fonts';
import type { IPostFull } from '@/types/post.types';
import { transformCreateDate } from '@/utils/transform-create-date';

hljs.registerLanguage('javascript', javascript);

export const Post = (post: IPostFull) => {
	const highlightedCode = post.code ? hljs.highlightAuto(post.code).value : '';

	return (
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
						{transformCreateDate(post.posted_ago)}
					</span>
				</div>
			</div>
			<h3 className={ubuntu.className}>{post.title}</h3>
			<p>{post.description}</p>
			{post.code && (
				<p
					dangerouslySetInnerHTML={{ __html: highlightedCode }}
					className='hljs p-4'
				/>
			)}
			{post.files && (
				<div className='flex flex-wrap'>
					{post.files.map(file => (
						<Image
							key={file.id}
							src={file.file_url}
							width={250}
							height={250}
							alt={file.file_url}
						/>
					))}
				</div>
			)}
			<div className='flex gap-5'>
				<div className='flex gap-2'>
					<Heart className={`${post.liked_by_user ? 'fill-red-500' : ''}`} />
					<span>{post.likes}</span>
				</div>
				<div className='flex gap-2'>
					<MessageSquare />
					<span>{post.comments.length}</span>
				</div>
			</div>
		</div>
	);
};
