'use client';

import 'highlight.js/styles/stackoverflow-light.css';

import { Post } from './post';
import type { IPostFull } from '@/types/post.types';

export const Posts = ({ posts }: { posts: IPostFull[] }) => {
	return (
		<div className='flex flex-col gap-4'>
			{posts.map(post => (
				<Post
					key={post.id}
					{...post}
				/>
			))}
		</div>
	);
};
