import { instance } from '@/api/axios';
import { instanceServer } from '@/api/axios-server';

import type { IPost, IPostFull, IPosts } from '@/types/post.types';

class PostsService {
	private _POSTS = '/posts';

	async getPosts(page = 1, orderBy: string = 'created_at') {
		return instance.get<IPosts>(`${this._POSTS}?page=${page}&order_by=${orderBy}`);
	}

	async addPost(data: FormData) {
		return instance.post<IPostFull>(this._POSTS, data);
	}

	async getPost(id: number) {
		return instanceServer.get<IPostFull>(`${this._POSTS}/${id}`);
	}

	async deletePost(id: number) {
		return instance.delete<{ message: string }>(`${this._POSTS}/${id}`);
	}
}

export const postsService = new PostsService();
