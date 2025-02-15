'use client';

// @ts-ignore
import hljs from 'highlight.js/lib/core';
import { MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { publicPage } from '@/config/public-page.config';

import { transformCreateDate } from '@/utils/transform-create-date';

import styles from './News.module.css';
import { Like } from './like';
import { ubuntu } from '@/app/fonts/fonts';
import type { IPostFull } from '@/types/post.types';

interface Props extends IPostFull {
	isFull?: boolean;
}

const loadedLanguages = new Set<string>();

export const Post = (post: Props) => {
	const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);

	useEffect(() => {
		if (post.code && post.prog_language) {
			const language = post.prog_language;
			import(`highlight.js/lib/languages/${language}`)
				.then(module => {
					hljs.registerLanguage(language, module.default);
					loadedLanguages.add(language);
					setIsLanguageLoaded(true);
				})
				.catch(error => {
					console.log(`Не удалось загрузить язык: ${error}`);
				});
		} else if (post.prog_language && loadedLanguages.has(post.prog_language)) {
			setIsLanguageLoaded(true);
		}
	}, [post.prog_language, post.code]);

	// const loadLanguage = async (lang: string) => {
	// 	try {
	// 		console.log(lang);
	// 		const module = await import(
	// 			`https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/${lang}.min.js`
	// 		);
	// 		hljs.registerLanguage(lang, module.default);
	// 	} catch (error) {
	// 		console.error(`Ошибка загрузки языка ${lang}:`, error);
	// 	}
	// };

	// if (post.prog_language) loadLanguage(post.prog_language);

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
					<span>{transformCreateDate(post.posted_ago)}</span>
				</div>
			</div>
			<div className='flex flex-col gap-2'>
				{post.title && <h3 className={ubuntu.className}>{post.title}</h3>}
				{post.description && (
					<p className={`${styles.description} ${post.isFull ? '' : styles.shortDescription}`}>
						{post.description}
					</p>
				)}
				{post.code && (
					<p
						dangerouslySetInnerHTML={{ __html: highlightedCode }}
						className='hljs p-4'
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
