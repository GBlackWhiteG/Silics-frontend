import type { Metadata } from 'next';

import { Post } from '../post';

import { CommentInput } from './commentInput';
import { Comments } from './comments';
import { postsService } from '@/services/post.services';

export const metadata: Metadata = {
	title: 'Новости',
	description: '',
};

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
	const slug = (await params).id;

	const post = await postsService.getPost(slug);

	return (
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
	);
}
