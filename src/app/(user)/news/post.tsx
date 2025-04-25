'use client';

// @ts-ignore
import hljs from 'highlight.js/lib/core';
import { Check, Copy, MessageSquare, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { publicPage } from '@/config/public-page.config';

import { setCodeAction } from '@/store/codeReducer';

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
	const router = useRouter();
	const dispatch = useDispatch();
	const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);
	const [isCopied, setIsCopied] = useState(false);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(post.code || '');
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	const runCopiedCode = () => {
		if (post.code) {
			dispatch(setCodeAction(post.code));
			router.push(publicPage.CODE);
		}
	};

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
					<div className='relative group'>
						<p
							dangerouslySetInnerHTML={{ __html: highlightedCode }}
							className='hljs p-4 whitespace-pre-wrap break-words'
						/>
						<div className='flex gap-2 absolute text-sm top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-100'>
							<div className='relative'>
								<Copy
									onClick={copyToClipboard}
									size={22}
									className={`cursor-pointer text-gray-400 ${!isCopied ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 z-10`}
								/>
								<Check
									size={22}
									className={`text-gray-400 ${isCopied ? 'opacity-100' : 'opacity-0'}`}
								/>
							</div>
							<Play
								onClick={runCopiedCode}
								size={22}
								className='cursor-pointer text-gray-400'
							/>
						</div>
					</div>
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
