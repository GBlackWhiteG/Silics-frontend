'use client';

import { EllipsisVertical } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import { setDeletedPostIdAction } from '@/store/deletedPostIdReducer';

import { postsService } from '@/services/post.services';
import type { RootState } from '@/store';

interface Props {
	user_id: number;
	post_id: number;
}

export function PostFunctions({ user_id, post_id }: Props) {
	const userId = useSelector((state: RootState) => state.auth.auth.id);
	const dispatch = useDispatch();

	const buttonDeleteHandler = (id: number) => {
		const response = postsService.deletePost(id);
		dispatch(setDeletedPostIdAction(id));
	};

	return (
		<div className='self-center ml-auto p-2 cursor-pointer rounded-full group hover:bg-gray-100 transition duration-100 relative'>
			<EllipsisVertical className='text-gray-400' />
			<div className='hidden items absolute right-0 top-[100%] !p-4 group-hover:block'>
				{userId === user_id && (
					<button
						className='text-sm p-2 hover:bg-gray-100 transition duration-100'
						onClick={() => buttonDeleteHandler(post_id)}
					>
						Удалить
					</button>
				)}
			</div>
		</div>
	);
}
