'use client';

import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import { A11y, Navigation, Pagination, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { IFile } from '@/types/file.types';

export function ImageSlider({ images }: { images: IFile[] }) {
	return (
		<Swiper
			modules={[Pagination, Navigation, A11y, Zoom]}
			navigation
			pagination={{ clickable: false }}
			className='w-full max-w-[768px] rounded-md'
		>
			{images.map((image, index) => (
				<SwiperSlide
					key={index}
					className='!w-full aspect-[1.29] overflow-hidden relative'
				>
					<Image
						src={image.file_url}
						alt={`slide ${image.id}`}
						fill
						className='object-contain rounded-none'
					/>
					<Image
						src={image.file_url}
						alt={`slide ${image.id}`}
						width={50}
						height={50}
						className='w-full h-full blur-md brightness-50 absolute object-cover z-[-1]'
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
