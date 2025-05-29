import type { Metadata } from 'next';

import { Post } from '../post';

import { CommentInput } from './commentInput';
import { Comments } from './comments';
import { postsService } from '@/services/post.services';

export const metadata: Metadata = {
	title: 'Новости',
	description: '',
};

export default async function Page({ params }: { params: { id: number } }) {
	const slug = params.id;

	const post = await postsService.getPost(slug);

	return (
		<section className='grid grid-cols-[1fr_250px] gap-4'>
			<div className='flex flex-col gap-4'>
				<Post
					{...post.data}
					isFull={true}
				/>

				<div className='sidebar-items'>
					<CommentInput postId={slug} />
				</div>
				<Comments postId={slug} />
			</div>
			<article className={`sidebar-items`}>
				<h2>Уведомления</h2>
				<ul>
					<li></li>
				</ul>
			</article>
		</section>
	);
}
