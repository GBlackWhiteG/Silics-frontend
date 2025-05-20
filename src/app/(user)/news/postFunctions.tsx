'use client';

import { useDispatch, useSelector } from 'react-redux';

import { ItemFunctions } from '@/components/ui/itemFunctions/itemFunctions';

import { setDeletedPostIdAction } from '@/store/deletedPostIdReducer';

import { postsService } from '@/services/post.services';
import type { RootState } from '@/store';

export function PostFunctions({ user_id, item_id }: { user_id: number; item_id: number }) {
	const dispatch = useDispatch();
	const userId = useSelector((state: RootState) => state.auth.auth.id);

	const buttonDeleteHandler = {
		func: () => {
			const response = postsService.deletePost(item_id);
			dispatch(setDeletedPostIdAction(item_id));
		},
		buttonText: 'Удалить',
	};

	const buttonChangeHandler = {
		func: () => {
			console.log(1);
		},
		buttonText: 'Изменить',
	};

	return userId === user_id && <ItemFunctions funcs={[buttonDeleteHandler, buttonChangeHandler]} />;
}
