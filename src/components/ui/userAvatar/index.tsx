import Image from 'next/image';

export function UserAvatar({
	userAvatarUrl,
	userName,
	avatarWidth,
}: {
	userAvatarUrl: string;
	userName: string;
	avatarWidth: number;
}) {
	return (
		<div className={`w-[${avatarWidth}px] rounded-full aspect-square overflow-hidden relative`}>
			<Image
				className='object-cover'
				src={userAvatarUrl || '/anonymous.jpg'}
				alt={userName}
				fill
			/>
		</div>
	);
}
