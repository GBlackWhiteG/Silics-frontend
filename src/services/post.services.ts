import type { AxiosError } from 'axios';

import { instance } from '@/api/axios';
import { instanceServer } from '@/api/axios-server';

import type { IPostFull, IPosts } from '@/types/post.types';

class PostsService {
	private _POSTS = '/posts';

	async getPosts(page = 1, orderBy: string = 'created_at') {
		return instance.get<IPosts>(`${this._POSTS}?page=${page}&order_by=${orderBy}`);
	}

	async getUserPosts(id: number, page = 1) {
		return instance.get<IPosts>(`${this._POSTS}/user/${id}?page=${page}`);
	}

	async addPost(data: FormData) {
		try {
			return instance.post<IPostFull>(this._POSTS, data);
		} catch (err) {
			throw err;
		}
	}

	async changePost(data: FormData, id: number) {
		try {
			return instance.post<IPostFull>(`${this._POSTS}/${id}`, data);
		} catch (err) {
			throw err;
		}
	}

	async getPost(id: number) {
		return instanceServer.get<IPostFull>(`${this._POSTS}/${id}`);
	}

	async deletePost(id: number) {
		return instance.delete<{ message: string }>(`${this._POSTS}/${id}`);
	}
}

export const postsService = new PostsService();
