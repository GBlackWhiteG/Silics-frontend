import { instance } from '@/api/axios';

class LikeServices {
	private _LIKES = '/likes';

	async like({ postId }: { postId: number }) {
		return instance.post(this._LIKES, { post_id: postId });
	}
}

export const likeServices = new LikeServices();
