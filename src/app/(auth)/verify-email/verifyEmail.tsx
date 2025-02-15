'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Loader } from '@/components/ui/loader';
import { Success } from '@/components/ui/success';

import { publicPage } from '@/config/public-page.config';

import { authServices } from '@/services/auth.services';
import { emailServices } from '@/services/email.services';

export function VerifyEmail() {
	const [isLoading, setIsLoading] = useState(true);
	const params = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		const verify = async () => {
			const urlParam = params.get('url');

			if (!urlParam) return;

			try {
				const response = await emailServices.verifyEmail(decodeURIComponent(urlParam));
				if (response.status === 200) {
					setIsLoading(false);
					authServices.saveTokenStorage(response.data.token);
					setTimeout(() => {
						router.push(publicPage.NEWS);
					}, 2000);
				}
			} catch (err) {
				console.log(err);
			}
		};

		verify();
	}, []);

	return (
		<div className='flex flex-col items-center text-center items'>
			<Image
				src={'/logo.svg'}
				alt='logo'
				width={100}
				height={50}
			></Image>
			{isLoading ? (
				<>
					<p className='text-md mt-4 text-gray-400'>Пожалуйста подождите</p>
					<h4 className='text-2xl mb-4 uppercase'>Подтверждение почты</h4>
					<Loader />
				</>
			) : (
				<>
					<p className='text-md mt-4 text-gray-400'>Успешно</p>
					<h4 className='text-2xl mb-4 uppercase'>Почта подтверждена</h4>
					<Success />
				</>
			)}
		</div>
	);
}
