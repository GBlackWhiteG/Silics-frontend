'use client';

import { useDispatch } from 'react-redux';

import { ItemFunctions } from '@/components/ui/itemFunctions/itemFunctions';

import { setDeletedCommentIdAction } from '@/store/deletedCommentIdReducer';

import { commentServices } from '@/services/comment.services';

export function CommentFunctions({ user_id, item_id }: { user_id: number; item_id: number }) {
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
		<ItemFunctions
			user_id={user_id}
			funcs={[buttonDeleteHandler, buttonChangeHandler]}
		/>
	);
}
