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

	async changeComment(data: FormData, id: number) {
		return instance.post<IComment>(`${this._COMMENTS}/${id}`, data);
	}

	async deleteComment(id: number) {
		return instance.delete(`${this._COMMENTS}/${id}`);
	}
}

export const commentServices = new CommentServices();
