'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ItemFunctions } from '@/components/ui/itemFunctions/itemFunctions';

import { publicPage } from '@/config/public-page.config';

import { setDeletedPostIdAction } from '@/store/deletedPostIdReducer';

import { PostModal } from './postModal';
import { postsService } from '@/services/post.services';
import type { RootState } from '@/store';
import type { IPostFull } from '@/types/post.types';

export function PostFunctions({
	user_id,
	item_id,
	post,
}: {
	user_id: number;
	item_id: number;
	post: IPostFull;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const dispatch = useDispatch();
	const userId = useSelector((state: RootState) => state.auth.auth.id);
	const userRole = useSelector((state: RootState) => state.auth.auth.role);

	const isDetailPage = pathname === `${publicPage.NEWS}/${post.id}`;

	const buttonDeleteHandler = {
		func: () => {
			const response = postsService.deletePost(item_id);
			dispatch(setDeletedPostIdAction(item_id));
			if (isDetailPage) {
				setTimeout(() => {
					router.push(publicPage.NEWS);
				}, 500);
			}
		},
		buttonText: 'Удалить',
	};

	const [isPostModalOpen, setPostModalOpen] = useState(false);

	const buttonChangeHandler = {
		func: () => {
			setPostModalOpen(true);
		},
		buttonText: 'Изменить',
	};

	return (
		<>
			{userId === user_id ? (
				<ItemFunctions funcs={[buttonChangeHandler, buttonDeleteHandler]} />
			) : (
				userRole === 'admin' && <ItemFunctions funcs={[buttonDeleteHandler]} />
			)}

			{isPostModalOpen && (
				<PostModal
					post={post}
					closeModal={() => setPostModalOpen(false)}
					isDetailPage={isDetailPage}
				/>
			)}
		</>
	);
}
