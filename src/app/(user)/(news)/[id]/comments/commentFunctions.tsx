'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ItemFunctions } from '@/components/ui/itemFunctions/itemFunctions';

import { setDeletedCommentIdAction } from '@/store/deletedCommentIdReducer';

import { CommentModal } from './commentModal';
import { commentServices } from '@/services/comment.services';
import type { RootState } from '@/store';
import type { IComment } from '@/types/comment.types';

export function CommentFunctions({
	user_id,
	item_id,
	comment,
}: {
	user_id: number;
	item_id: number;
	comment: IComment;
}) {
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

	const [isCommentModalOpen, setCommentModalOpen] = useState(false);

	const buttonChangeHandler = {
		func: () => {
			setCommentModalOpen(true);
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
			{isCommentModalOpen && (
				<CommentModal
					comment={comment}
					closeModal={() => setCommentModalOpen(false)}
				/>
			)}
		</>
	);
}
