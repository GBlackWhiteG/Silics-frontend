import { instance } from '@/api/axios';

import type { IPost, IPostFull } from '@/types/post.types';

class PostsService {
	private _POSTS = '/posts';

	async getPosts() {
		return instance.get<IPostFull[]>(this._POSTS);
	}

	async addPost(data: FormData) {
		return instance.post<IPost>(this._POSTS, data);
	}

	async getPost(id: number) {
		return instance.get<IPostFull>(`${this._POSTS}/${id}`);
	}
}

export const postsService = new PostsService();
