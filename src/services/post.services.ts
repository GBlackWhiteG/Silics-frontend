import { axiosClassic } from '@/api/axios';

import type { Post } from '@/types/post.types';

class PostsService {
	private _POSTS = '/posts';

	async getPosts() {
		return axiosClassic.get<Post[]>(this._POSTS);
	}
}

export const postsService = new PostsService();
