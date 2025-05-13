import { instance } from '@/api/axios';

import type { IComments } from '@/types/comment.types';

class CommentServices {
	private _COMMENTS = '/auth/comments';

	async getComments(postId: number, page = 1) {
		return instance.get<IComments>(`${this._COMMENTS}/${postId}?page=${page}`);
	}

	async addComment(data: FormData) {
		return instance.post(this._COMMENTS, data);
	}
}

export const commentServices = new CommentServices();
