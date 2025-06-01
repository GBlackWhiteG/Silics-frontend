export interface IPostNotification {
	id: number;
	userId: number;
	likedUserId: number;
	likedUserAvatar: string;
	postId: number;
	message: string;
	notification_type: string;
}
