import type { Metadata, NextPage } from 'next';

import { Post } from '../post';

import { CommentInput } from './commentInput';
import { Comments } from './comments';
import { postsService } from '@/services/post.services';

interface PageProps {
	params: { id: string };
}

export const metadata: Metadata = {
	title: 'Новости',
	description: '',
};

const Page: NextPage<PageProps> = async ({ params }) => {
	const slug = params.id;

	const post = await postsService.getPost(Number(slug));

	return (
		<section className='grid grid-cols-[1fr_250px] gap-4'>
			<div className='flex flex-col gap-4'>
				<Post
					{...post.data}
					isFull={true}
				/>
				<div className='sidebar-items'>
					<CommentInput postId={Number(slug)} />
				</div>
				<Comments postId={Number(slug)} />
			</div>
			<article className='sidebar-items'>
				<h2>Уведомления</h2>
				<ul>
					<li></li>
				</ul>
			</article>
		</section>
	);
};

export default Page;
