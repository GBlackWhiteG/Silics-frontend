// @ts-ignore
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import 'highlight.js/styles/xcode.css';
import { MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { HighlightedCode } from '@/components/ui/highlightedCode';

import { publicPage } from '@/config/public-page.config';

import { transformCreateDate } from '@/utils/transform-create-date';

import styles from './News.module.css';
import { Like } from './like';
import { PostFunctions } from './postFunctions';
import { ubuntu } from '@/app/fonts/fonts';
import type { IPostFull } from '@/types/post.types';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('php', php);

interface Props extends IPostFull {
	isFull?: boolean;
}

export const Post = (post: Props) => {
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
					<span>{transformCreateDate(post.posted_ago)}</span>
				</div>
				<PostFunctions
					post_id={post.id}
					user_id={post.user_id}
				/>
			</div>
			<div className='flex flex-col gap-2'>
				{post.title && <h3 className={ubuntu.className}>{post.title}</h3>}
				{post.description && (
					<p className={`${styles.description} ${post.isFull ? '' : styles.shortDescription}`}>
						{post.description}
					</p>
				)}
				{post.code && post.prog_language && (
					<HighlightedCode
						code={post.code}
						language={post.prog_language}
					/>
				)}
				{post.files && post.files?.length > 0 && (
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
			</div>
			<div className='flex gap-5 mt-4'>
				<Like
					postId={post.id}
					initialIsActive={post.liked_by_user}
					initialLikesCount={post.likes}
				/>
				<Link href={`${publicPage.NEWS}/${post.id}`}>
					<div className='flex gap-2'>
						<MessageSquare />
						<span>{post.comments_count}</span>
					</div>
				</Link>
			</div>
		</div>
	);
};
