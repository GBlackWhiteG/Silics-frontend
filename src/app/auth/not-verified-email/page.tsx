import type { Metadata } from 'next';
import Image from 'next/image';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Подтвердите почту',
	...NO_INDEX_PAGE,
};

export default function Page() {
	return (
		<div className='flex flex-col items-center text-center items'>
			<Image
				src={'/logo.svg'}
				alt='logo'
				width={100}
				height={50}
			></Image>
			<h4 className='text-2xl mt-2 uppercase'>Подтвердите почту</h4>
			<p className='text-md text-gray-400'>Вам на почту было отправлено письмо</p>
		</div>
	);
}
