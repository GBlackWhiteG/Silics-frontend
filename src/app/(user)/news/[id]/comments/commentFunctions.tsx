'use client';

import { useDispatch, useSelector } from 'react-redux';

import { ItemFunctions } from '@/components/ui/itemFunctions/itemFunctions';

import { setDeletedCommentIdAction } from '@/store/deletedCommentIdReducer';

import { commentServices } from '@/services/comment.services';
import type { RootState } from '@/store';

export function CommentFunctions({ user_id, item_id }: { user_id: number; item_id: number }) {
	const userId = useSelector((state: RootState) => state.auth.auth.id);
	const userRole = useSelector((state: RootState) => state.auth.auth.role);
	const dispatch = useDispatch();

	const buttonDeleteHandler = {
		func: () => {
			const response = commentServices.deleteComment(item_id);
			dispatch(setDeletedCommentIdAction(item_id));
		},
		buttonText: 'Удалить',
	};

	const buttonChangeHandler = {
		func: () => {
			console.log(1);
		},
		buttonText: 'Изменить',
	};

	return (
		<>
			{userId === user_id ? (
				<ItemFunctions funcs={[buttonDeleteHandler, buttonChangeHandler]} />
			) : (
				userRole === 'admin' && <ItemFunctions funcs={[buttonDeleteHandler]} />
			)}
		</>
	);
}
