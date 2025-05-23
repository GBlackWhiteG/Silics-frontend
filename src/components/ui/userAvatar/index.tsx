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
		<div
			className={`rounded-full aspect-square overflow-hidden relative`}
			style={{ width: avatarWidth }}
		>
			<Image
				className='object-cover'
				src={userAvatarUrl || '/anonymous.jpg'}
				alt={userName}
				fill
			/>
		</div>
	);
}
