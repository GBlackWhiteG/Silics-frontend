import { instance } from '@/api/axios';

import type { IComment, IComments } from '@/types/comment.types';

class CommentServices {
	private _COMMENTS = '/comments';

	async getComments(postId: number, page = 1) {
		return instance.get<IComments>(`${this._COMMENTS}/${postId}?page=${page}`);
	}

	async addComment(data: FormData) {
		return (await instance.post<IComment>(this._COMMENTS, data)).data;
	}

	async changePost(data: FormData, id: number) {
		try {
			return instance.post<IComment>(`${this._COMMENTS}/${id}`, data);
		} catch (err) {
			throw err;
		}
	}

	async deleteComment(id: number) {
		return instance.delete(`${this._COMMENTS}/${id}`);
	}
}

export const commentServices = new CommentServices();
