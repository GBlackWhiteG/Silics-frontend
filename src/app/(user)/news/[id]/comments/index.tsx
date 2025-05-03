import Image from 'next/image';

import { HighlightedCode } from '@/components/ui/highlightedCode';

import { transformCreateDate } from '@/utils/transform-create-date';

import styles from './Comments.module.css';
import type { IComment } from '@/types/comment.types';

export function Comments({ comments }: { comments: IComment[] }) {
	return (
		<div className={styles.comments}>
			{comments.map(comment => (
				<div
					key={comment.id}
					className='flex flex-col gap-2'
				>
					<div className='flex gap-2 items-center'>
						<Image
							src={comment.user.avatar_url || '/anonymous.jpg'}
							width={40}
							height={40}
							alt={comment.user.nickname}
						></Image>
						<div className='flex flex-col gap-0.5'>
							<span className='text-sm text-[#232020] font-semibold'>{comment.user.name}</span>
							<span className='text-sm text-[#d8d8d8]'>
								{transformCreateDate(comment.posted_ago)}
							</span>
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						<p>{comment.content}</p>
						<HighlightedCode
							code={comment.code}
							language={comment.prog_language}
						/>
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
					</div>
				</div>
			))}
		</div>
	);
}
