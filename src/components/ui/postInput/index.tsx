'use client';

import { ChevronDown, ImagePlus, Paperclip } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/buttons';

import styles from './PostInput.module.css';
import { AutoResizeTextArea } from './autoResizeTextarea';
import { postsService } from '@/services/post.services';

export function PostInput() {
	const [isOptionsOpen, setOptionsOpen] = useState(false);

	const [formOptions, setFormOptions] = useState({
		header: false,
		code: false,
	});

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, checked } = e.target;
		setFormOptions(prev => ({ ...prev, [id]: checked }));
	};

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		code: '',
		files: null as FileList | null,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({ ...prev, files: e.target.files }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const { title, description, code, files } = formData;
		const formDataToSend = new FormData();

		formDataToSend.append('title', title);
		formDataToSend.append('description', description);
		formDataToSend.append('code', code)

		if (files) {
			Array.from(files).forEach(file => {
				formDataToSend.append('files[]', file);
			});
		}

		try {
			postsService.addPost(formDataToSend);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<form
			className='flex flex-col gap-7 w-full rounded-lg p-4 bg-foreground'
			onSubmit={handleSubmit}
		>
			<div className='grid grid-cols-[auto_1fr_auto] gap-4'>
				<div className={styles.wrapperImage}>
					<Image
						src='/anonymous.jpg'
						width={40}
						height={40}
						alt='user-avatar'
					></Image>
				</div>
				<div className={styles.inputs}>
					{formOptions.header && (
						<input
							type='text'
							name='title'
							placeholder='Заголовок'
							className='bg-background'
							onChange={handleChange}
						/>
					)}
					<AutoResizeTextArea
						inputName={'description'}
						inputPlaceholder={'Как у вас дела?'}
						inputState={(value: string) => setFormData(prev => ({ ...prev, description: value }))}
					/>
					{formOptions.code && (
						<AutoResizeTextArea
							inputName={'code'}
							inputPlaceholder={'Код'}
							inputState={(value: string) => setFormData(prev => ({ ...prev, code: value }))}
						/>
					)}
				</div>
				<Button
					text='Отправить'
					isSubmit={true}
					className='max-h-10'
				/>
			</div>
			<div className='flex gap-4'>
				<input
					id='images'
					type='file'
					multiple
					onChange={handleFileChange}
					className='hidden'
				/>
				<label
					htmlFor='images'
					className='cursor-pointer flex gap-1'
				>
					<ImagePlus className='text-blue-500' />
					<span>Изображения/!Видео {formData.files && `(${formData.files.length})`}</span>
				</label>
				<input
					id='files'
					type='file'
					multiple
					onChange={handleFileChange}
					className='hidden'
				/>
				<label
					htmlFor='files'
					className='cursor-pointer flex gap-1'
				>
					<Paperclip className='text-green-500' />
					<span>Вложения {formData.files && `(${formData.files.length})`}</span>
				</label>
				<span className={`${isOptionsOpen ? 'rotate-180' : ''} ml-auto cursor-pointer`} onClick={() => setOptionsOpen(prev => !prev)}>
					<ChevronDown />
				</span>
			</div>
			{isOptionsOpen && (
				<div className='flex gap-4 border-t border-gray-200 pt-3'>
					<div className='flex gap-1'>
						<input
							id='header'
							type='checkbox'
							onChange={handleCheckboxChange}
						/>
						<label htmlFor='header'>Заголовок</label>
					</div>
					<div className='flex gap-1'>
						<input
							id='code'
							type='checkbox'
							onChange={handleCheckboxChange}
						/>
						<label htmlFor='code'>Код</label>
					</div>
				</div>
			)}
		</form>
	);
}
