'use client';

import Image from 'next/image';

import type { IFile } from '@/types/file.types';

export function ImageSlider({ images }: { images: IFile[] }) {
	return (
		<div className='flex overflow-hidden'>
			{images.map((image, index) => (
				<div
					key={index}
					className='w-full h-[540px] relative'
				>
					<Image
						src={image.file_url}
						alt={`slide ${image.id}`}
						fill
						objectFit='contain'
						// placeholder='blur'
						sizes='100vw'
					/>
				</div>
			))}
		</div>
	);
}
