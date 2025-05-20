import type { Metadata } from 'next';

import { FriendsList } from './friendsList';

export const metadata: Metadata = {
	title: 'Подиски',
};

export default function Friends() {
	return (
		<section>
			<FriendsList />
		</section>
	);
}
