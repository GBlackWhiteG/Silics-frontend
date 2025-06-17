'use client';

import Image from 'next/image';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import { A11y, Navigation, Pagination, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { IFile } from '@/types/file.types';

export function ImageSlider({ images }: { images: IFile[] }) {
	const [isFull, setIsFull] = useState(false);

	return (
		<Swiper
			modules={[Pagination, Navigation, A11y, Zoom]}
			navigation
			pagination={{ clickable: false }}
			className={`w-full max-w-[768px] rounded-md ${isFull && 'max-w-full max-h-full h-full rounded-none !fixed top-0 left-0'}`}
		>
			{images.map((image, index) => (
				<SwiperSlide
					key={index}
					className={`!w-full aspect-[1.29] overflow-hidden relative ${isFull && 'aspect-auto'}`}
				>
					<Image
						src={image.file_url}
						alt={`slide ${image.id}`}
						fill
						className='object-contain rounded-none cursor-pointer'
						onClick={() => setIsFull(prev => !prev)}
					/>
					<div>
						<Image
							src={image.file_url}
							alt={`slide ${image.id}`}
							width={50}
							height={50}
							className='w-full h-full brightness-50 absolute object-cover z-[-1]'
						/>
						<div className='absolute inset-0 backdrop-blur-md z-[-1]' />
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
