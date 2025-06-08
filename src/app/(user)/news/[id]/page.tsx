import type { Metadata } from 'next';

import { Notification } from '@/components/ui/notification';

import { Post } from '../post';

import { CommentInput } from './commentInput';
import { Comments } from './comments';
import { postsService } from '@/services/post.services';

type Props = {
	params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const post = await postsService.getPost(Number(id));

	return {
		title: post.data.title || 'Новости',
		description: post.data.description,
	};
}

export default async function Page({ params }: Props) {
	const { id } = await params;
	const post = await postsService.getPost(Number(id));

	return (
		<section className='w-full page-grid gap-4'>
			<div className='flex flex-col gap-4'>
				<Post
					{...post.data}
					isFull={true}
				/>
				<div className='sidebar-items'>
					<CommentInput postId={Number(id)} />
				</div>
				<Comments postId={Number(id)} />
			</div>
			<Notification />
		</section>
	);
}
