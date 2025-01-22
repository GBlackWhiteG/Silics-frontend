import { axiosClassic, instance } from '@/api/axios';

import type { IPost } from '@/types/post.types';

class PostsService {
	private _POSTS = '/posts';

	async getPosts() {
		return axiosClassic.get<IPost[]>(this._POSTS);
	}

	async addPost(data: { title?: string; description?: string, files?: File[] }) {
		return instance.post<IPost>(this._POSTS, data);
	}
}

export const postsService = new PostsService();
