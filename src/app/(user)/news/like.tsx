'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';

import { likeServices } from '@/services/likes.services';

interface Props {
	postId: number;
	initialLikesCount: number;
	initialIsActive: boolean;
}

export function Like({ postId, initialLikesCount, initialIsActive }: Props) {
	const [isActive, setIsActive] = useState(initialIsActive);
	const [likesCount, setLikesCount] = useState(initialLikesCount);
	const handleLike = async () => {
		setIsActive(!isActive);
		setLikesCount(isActive ? likesCount - 1 : likesCount + 1);
		const response = await likeServices.like({ postId });

		if (response.status !== 200) {
			setIsActive(!isActive);
			setLikesCount(isActive ? likesCount - 1 : likesCount + 1);
		}
	};

	return (
		<div className='flex gap-2'>
			<Heart
				className={`${isActive ? 'fill-red-500 stroke-red-700' : ''} cursor-pointer`}
				onClick={handleLike}
			/>
			<span>{likesCount}</span>
		</div>
	);
}
