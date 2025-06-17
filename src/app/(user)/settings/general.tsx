'use client';

import type { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

import { Button } from '@/components/ui/buttons';
import { ToggleSwitch } from '@/components/ui/toggleSwitch';

import { parseError } from '@/utils/get-parse-error';

import { authServices } from '@/services/auth.services';
import { userServices } from '@/services/user.services';
import type { RootState } from '@/store';
import type { IFullUser } from '@/types/user.types';

export function General({ user }: { user: IFullUser | null }) {
	const userId = useSelector((state: RootState) => state.auth.auth.id);
	const [isOnTwoFA, setIsOnTwoFA] = useState(user?.is_enabled_two_fa);

	const [formData, setFormData] = useState({
		old_password: '',
		new_password: '',
		new_password_confirmation: '',
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.old_password || !formData.new_password || !formData.new_password_confirmation) {
			return;
		}
		try {
			const response = await authServices.changePassword(userId, formData);
			toast.success(response.data.message);
			setFormData({
				old_password: '',
				new_password: '',
				new_password_confirmation: '',
			});
		} catch (err: AxiosError | any) {
			const message = parseError(err);

			toast.error(message);
		}
	};

	const handleChange = async () => {
		const response = await userServices.toggleTwoFA(userId);
		setIsOnTwoFA(prev => !prev);

		if (response.status === 200) {
			toast.success(response.data.message);
		}
	};

	useEffect(() => {
		setIsOnTwoFA(user?.is_enabled_two_fa);
	}, [user]);

	return (
		<div className='items'>
			<h2 className='text-xl mb-4'>Общие</h2>
			<form
				className='mb-4'
				onSubmit={handleSubmit}
			>
				<h4 className='text-md'>Изменить пароль</h4>
				<div className='flex flex-col gap-2 mb-2 mt-2 md:flex-row'>
					<label className='flex flex-col gap-1'>
						<span>Старый пароль</span>
						<input
							type='password'
							name='old_password'
							value={formData.old_password}
							onChange={e => setFormData(prev => ({ ...prev, ['old_password']: e.target.value }))}
						/>
					</label>
					<label className='flex flex-col gap-1'>
						<span>Новый пароль</span>
						<input
							type='password'
							name='new_password'
							value={formData.new_password}
							onChange={e => setFormData(prev => ({ ...prev, ['new_password']: e.target.value }))}
						/>
					</label>
					<label className='flex flex-col gap-1'>
						<span>Подтвердите новый пароль</span>
						<input
							type='password'
							name='new_password_confirmation'
							value={formData.new_password_confirmation}
							onChange={e =>
								setFormData(prev => ({ ...prev, ['new_password_confirmation']: e.target.value }))
							}
						/>
					</label>
				</div>
				<Button
					text={'Изменить'}
					isSubmit={true}
					isInverted={true}
				/>
			</form>
			<label className='flex justify-between'>
				<span>Включить двухфакторную аутентификацию</span>
				<ToggleSwitch
					isOn={isOnTwoFA}
					onClick={handleChange}
				/>
			</label>
		</div>
	);
}
