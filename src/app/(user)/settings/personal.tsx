'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui/buttons';

import { setAuthAction } from '@/store/authReducer';

import { authServices } from '@/services/auth.services';
import { userServices } from '@/services/user.services';
import type { RootState } from '@/store';

export function Personal() {
	const dispatch = useDispatch();
	const userId = useSelector((state: RootState) => state.auth.auth.id);
	const [personalData, setPersonalData] = useState({
		name: '',
		nickname: '',
		email: '',
		biography: '',
		avatar: null as File | null,
	});
	const [avatarUrl, setAvatarUrl] = useState('');

	useEffect(() => {
		const getProfileData = async () => {
			const response = await userServices.getProfile({ id: userId });
			if (response.status === 200) {
				const data = response.data;
				setPersonalData(prev => ({ ...prev, ['name']: data.name }));
				setPersonalData(prev => ({ ...prev, ['nickname']: data.nickname }));
				setPersonalData(prev => ({ ...prev, ['email']: data.email }));
				setPersonalData(prev => ({ ...prev, ['biography']: data.biography }));
				setAvatarUrl(data.avatar_url);
			}
		};

		if (userId) getProfileData();
	}, [userId]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setPersonalData(prev => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPersonalData(prev => ({ ...prev, avatar: e.target.files?.[0] || null }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const { name, nickname, email, biography, avatar } = personalData;
		const formDataToSend = new FormData();

		formDataToSend.append('name', name);
		formDataToSend.append('nickname', nickname);
		formDataToSend.append('email', email);
		formDataToSend.append('biography', biography);

		if (avatar) {
			formDataToSend.append('avatar', avatar);
		}

		const response = await userServices.changeProfile(userId, formDataToSend);
		if (response.status === 200) {
			const response = await authServices.getMe();
			dispatch(setAuthAction(response.data));
		}
	};

	return (
		<div>
			<h2 className='text-xl mb-4'>Персональные данные</h2>
			<form
				action=''
				className='grid grid-cols-2 gap-10'
				onSubmit={handleSubmit}
			>
				<div className='flex flex-col justify-between gap-4'>
					<label className='flex flex-col gap-2'>
						<span>Фото профиля</span>
						<div className='w-full bg-[--elements-bg] aspect-square rounded-[0.5rem] border-2 border-dashed cursor-pointer relative overflow-hidden'>
							<Image
								src={avatarUrl || '/anonymous.jpg'}
								alt='avatar'
								fill
								className='object-cover'
							/>
							{avatarUrl && (
								<Image
									src={'/image-input-mask.png'}
									alt='image-input-mask'
									fill
									className='opacity-30 pointer-events-none'
								/>
							)}
						</div>
						<input
							type='file'
							className='hidden'
							name='avatar'
							onChange={handleFileChange}
						/>
					</label>
					<Button
						text={'Сохранить'}
						type={'submit'}
						className='w-full'
					/>
				</div>
				<div className='w-full flex flex-col gap-4'>
					<label className='flex flex-col gap-2'>
						<span>Имя</span>
						<input
							type='text'
							name='name'
							value={personalData.name}
							onChange={handleChange}
						/>
					</label>
					<label className='flex flex-col gap-2'>
						<span>Никнейм</span>
						<input
							type='text'
							name='nickname'
							value={personalData.nickname}
							onChange={handleChange}
						/>
					</label>
					<label className='flex flex-col gap-2'>
						<span>Почта</span>
						<input
							type='email'
							name='email'
							value={personalData.email}
							onChange={handleChange}
						/>
					</label>
					<label className='flex flex-col gap-2'>
						<span>Биография</span>
						<textarea
							name='biography'
							className='rounded-[0.5rem] py-[0.75rem] px-[0.75rem]'
							cols={30}
							rows={7}
							value={personalData.biography || ''}
							onChange={handleChange}
						></textarea>
					</label>
				</div>
			</form>
		</div>
	);
}
