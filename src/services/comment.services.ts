import { instance } from '@/api/axios';

class CommentServices {
	private _COMMENTS = '/auth/comments';

	async addComment(data: FormData) {
		return instance.post(this._COMMENTS, data);
	}
}

export const commentServices = new CommentServices();
