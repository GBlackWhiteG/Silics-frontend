import { friendsService } from "@/services/friends.services";

export async function FriendsList() {
  const friends = await friendsService.getFriends();

	return (
    <ul>
      {friends.data.map(friend => (
        <li key={friend.id}>{friend.name}</li>
      ))}
    </ul>
  );
}
