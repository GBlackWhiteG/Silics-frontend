import { axiosClassic, instance } from '@/api/axios';

import type { IPost, IPostFull } from '@/types/post.types';

class PostsService {
	private _POSTS = '/posts';

	async getPosts() {
		return instance.get<IPostFull[]>(this._POSTS);
	}

	async addPost(data: FormData) {
		return instance.post<IPost>(this._POSTS, data);
	}
}

export const postsService = new PostsService();
