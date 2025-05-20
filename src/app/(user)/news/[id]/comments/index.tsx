'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';

import { FileIcon } from '@/components/ui/FileIcon';
import { HighlightedCode } from '@/components/ui/highlightedCode';
import { UserAvatar } from '@/components/ui/userAvatar';

import { publicPage } from '@/config/public-page.config';

import { transformCreateDate } from '@/utils/transform-create-date';

import styles from './Comments.module.css';
import { CommentFunctions } from './commentFunctions';
import { commentServices } from '@/services/comment.services';
import type { RootState } from '@/store';
import type { IComment } from '@/types/comment.types';

export function Comments({ postId }: { postId: number }) {
	const [comments, setComments] = useState<IComment[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const { ref, inView } = useInView();
	const ids = useRef(new Set<number>());

	const newComment = useSelector((state: RootState) => state.newComment.comment);
	const deletedCommentId = useSelector((state: RootState) => state.deletedCommentId.id);

	const loadMoreComments = async () => {
		if (hasMore) {
			const response = (await commentServices.getComments(postId, page)).data;
			const newComments = response.data.filter(comment => !ids.current.has(comment.id));
			setComments(prev => [...prev, ...newComments]);
			setPage(prev => prev + 1);
			setHasMore(response.meta.current_page < response.meta.last_page);

			newComments.forEach(comment => {
				ids.current.add(comment.id);
			});
		}
	};

	useEffect(() => {
		if (Object.keys(newComment).length > 0) {
			setComments(prev => [newComment, ...prev]);
			ids.current.add(newComment.id);
		}
	}, [newComment]);

	useEffect(() => {
		if (deletedCommentId) {
			setComments(prev => prev.filter(comment => comment.id !== deletedCommentId));
			ids.current.delete(deletedCommentId);
		}
	}, [deletedCommentId]);

	useEffect(() => {
		if (inView) {
			loadMoreComments();
		}
	}, [inView]);

	return (
		<div className={styles.comments}>
			{comments.length > 0 &&
				comments.map(comment => (
					<div
						key={comment.id}
						className='flex flex-col gap-2'
					>
						<div className='flex gap-2 items-center'>
							<Link href={`${publicPage.PROFILE}/${comment.user.id}`}>
								<UserAvatar
									userAvatarUrl={comment.user.avatar_url}
									userName={comment.user.name}
									avatarWidth={40}
								/>
							</Link>
							<div className='flex flex-col gap-0.5'>
								<span className='text-sm text-[#232020] font-semibold'>{comment.user.name}</span>
								<span className='text-sm text-[#d8d8d8]'>
									{transformCreateDate(comment.posted_ago)}
								</span>
							</div>
							<CommentFunctions
								user_id={comment.user.id}
								item_id={comment.id}
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<p>{comment.content}</p>
							{comment.code && (
								<HighlightedCode
									code={comment.code}
									language={comment.prog_language}
								/>
							)}
							{comment.files && comment.files?.length > 0 && (
								<div className='flex flex-wrap'>
									{comment.files.map(file => (
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
							{comment.attachments && comment.attachments?.length > 0 && (
								<div>
									{comment.attachments.map(attachment => (
										<Link
											href={attachment.attachment_url}
											key={attachment.id}
											className='flex gap-1'
										>
											<FileIcon mime={attachment.mime_type} />
											<span>{attachment.original_filename}</span>
										</Link>
									))}
								</div>
							)}
						</div>
					</div>
				))}
			<div ref={ref}></div>
		</div>
	);
}
