import { instance } from '@/api/axios';
import { instanceServer } from '@/api/axios-server';

import type { IPost, IPostFull } from '@/types/post.types';

class PostsService {
	private _POSTS = '/posts';

	async getPosts(orderBy: string = 'created_at') {
		return instance.get<IPostFull[]>(`${this._POSTS}?order_by=${orderBy}`);
	}

	async addPost(data: FormData) {
		return instance.post<IPost>(this._POSTS, data);
	}

	async getPost(id: number) {
		return instanceServer.get<IPostFull>(`${this._POSTS}/${id}`);
	}
}

export const postsService = new PostsService();
