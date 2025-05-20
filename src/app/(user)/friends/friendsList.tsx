import { FriendCard } from './friendCard';
import { friendsService } from '@/services/friends.services';

export async function FriendsList() {
	const friends = await friendsService.getFriends();

	return (
		<ul className='items flex flex-col gap-1'>
			{friends.data.data.map(friend => (
				<FriendCard user={friend} />
			))}
		</ul>
	);
}
