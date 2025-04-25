import Image from 'next/image';

import styles from './Comments.module.css';
import type { IComment } from '@/types/comment.types';

export function Comments({ comments }: { comments: IComment[] }) {
	return (
		<div className={styles.comments}>
			{comments.map(comment => (
				<div key={comment.id}>
					<div className='flex gap-2 items-center'>
						<Image
							src={comment.user.avatar_url || '/anonymous.jpg'}
							width={40}
							height={40}
							alt={comment.user.nickname}
						></Image>
						<div className='flex flex-col gap-0.5'>
							<span className='text-md'>{comment.user.name}</span>
							<span className='text-sm'>{comment.created_at}</span>
						</div>
					</div>
					<div>
						<p className='mt-1'>{comment.content}</p>
					</div>
				</div>
			))}
		</div>
	);
}
