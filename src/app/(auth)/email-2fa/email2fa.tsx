'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { publicPage } from '@/config/public-page.config';

import { OtpInput } from './otpInput';
import { authServices } from '@/services/auth.services';
import { emailServices } from '@/services/email.services';

export function Email2fa() {
	const router = useRouter();
	const onComplete = async (otp: string) => {
		const response = await toast.promise(emailServices.verify2fa(otp), {
			loading: 'Пожалуйста подождите',
			success: 'Успешно',
			error: 'Неправильный код',
		});

		if (response.status === 200) {
			router.push(publicPage.NEWS);
			authServices.saveTokenStorage(response.data.token);
		}
	};

	return (
		<div className='items flex flex-col items-center'>
			<Image
				src={'/logo.svg'}
				alt='logo'
				width={100}
				height={50}
			></Image>
			<p className='text-sm text-gray-400 mt-2'>Вам на почту было отправлено письмо</p>
			<h3 className='text-2xl uppercase font-bold mb-3'>Код подтверждения</h3>
			<OtpInput onComplete={onComplete} />
		</div>
	);
}
