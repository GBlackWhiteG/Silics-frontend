'use client';

import type { AxiosError } from 'axios';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FileIcon } from '@/components/ui/FileIcon';
import { Button } from '@/components/ui/buttons';

import { setChangedPostAction } from '@/store/changedPostReducer';

import { getTransformedWord } from '@/utils/transform-words';

import styles from './News.module.css';
import { postsService } from '@/services/post.services';
import type { IPostFull } from '@/types/post.types';

export function PostModal({
	post,
	closeModal,
	isDetailPage = false,
}: {
	post: IPostFull;
	closeModal: () => void;
	isDetailPage: boolean;
}) {
	const router = useRouter();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		title: post.title,
		description: post.description,
		code: post.code,
		prog_language: post.prog_language,
		files: null as FileList | null,
		attachments: null as FileList | null,
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handlerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name } = e.target;
		setFormData(prev => ({ ...prev, [name]: e.target.files }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const { title, description, code, prog_language, files, attachments } = formData;
		const formDataToSend = new FormData();

		formDataToSend.append('title', title || '');
		formDataToSend.append('description', description || '');
		formDataToSend.append('code', code || '');
		formDataToSend.append('prog_language', prog_language || '');

		if (files) {
			Array.from(files).forEach(file => {
				formDataToSend.append('files[]', file);
			});
		}

		if (attachments) {
			Array.from(attachments).forEach(file => {
				formDataToSend.append('attachments[]', file);
			});
		}

		try {
			const response = await postsService.changePost(formDataToSend, post.id);
			closeModal();
			if (isDetailPage) {
				router.refresh();
			} else {
				dispatch(setChangedPostAction(response.data));
			}
		} catch (err: AxiosError | any) {
			console.log(err);
		}
	};

	return (
		<div className='w-full h-full flex justify-center items-center bg-black bg-opacity-60 fixed top-0 left-0 z-[11]'>
			<form
				onSubmit={handleSubmit}
				className='items max-w-xl w-full flex flex-col gap-2 bg-white opacity-100'
			>
				<h2>Редактирование поста</h2>
				<input
					name='title'
					className={`w-full text-sm px-3 py-2 rounded-md !text-black`}
					value={formData.title || ''}
					onChange={handleChange}
					placeholder='Заголовок'
				/>
				<textarea
					name='description'
					className={`${styles.description} w-full px-3 py-2 rounded-md resize-none overflow-y-scroll !text-black`}
					rows={5}
					placeholder='Описание'
					onChange={handleChange}
					value={formData.description || ''}
				/>
				<div className='relative'>
					<textarea
						name='code'
						className={`${styles.description} w-full px-3 py-2 rounded-md resize-none overflow-y-scroll !text-black relative`}
						rows={5}
						placeholder='Код'
						onChange={handleChange}
						value={formData.code || ''}
					/>
					<select
						name='prog_language'
						id='code_language_select'
						className='absolute top-[9px] right-[10px]'
						value={formData.prog_language || 'php'}
						onChange={handleChange}
					>
						<option value='php'>PHP</option>
						<option value='python'>Python</option>
						<option value='javascript'>JavaScript</option>
					</select>
				</div>
				<div className='flex flex-col gap-1'>
					<span>Изображения:</span>
					<div className='flex items-center gap-1'>
						{post.files && post.files?.length > 0 && (
							<div className='flex flex-wrap gap-2'>
								{post.files.map(file => (
									<Image
										key={file.id}
										src={file.file_url}
										width={50}
										height={50}
										alt={file.file_url}
									/>
								))}
							</div>
						)}
						{post.files && post.files?.length < 9 && (
							<label className='flex items-center gap-2 cursor-pointer'>
								{formData.files && formData.files?.length > 0 && (
									<span className='text-sm text-gray-600'>
										+ {formData.files?.length}
										{getTransformedWord(formData.files?.length, [
											' изображение',
											' изображений',
											' изображений',
										])}
									</span>
								)}
								<PlusCircle
									size={20}
									className='text-gray-400'
								/>
								<input
									multiple
									name='files'
									type='file'
									className='hidden'
									onChange={handlerFileChange}
								/>
							</label>
						)}
					</div>
				</div>
				<div className='flex flex-col gap-1'>
					<span>Вложения:</span>
					<div className='flex items-center gap-1'>
						{post.attachments && post.attachments?.length > 0 && (
							<div>
								{post.attachments.map(attachment => (
									<Link
										href={attachment.attachment_url}
										key={attachment.id}
										className='flex gap-1'
									>
										<FileIcon mime={attachment.mime_type} />
										<span>{attachment.original_filename}</span>
									</Link>
								))}
							</div>
						)}
						{post.attachments && post.attachments?.length < 9 && (
							<label className='flex items-center gap-2 cursor-pointer'>
								{formData.attachments && formData.attachments?.length > 0 && (
									<span className='text-sm text-gray-600'>
										+ {formData.attachments?.length}
										{getTransformedWord(formData.attachments?.length, [
											' вложение',
											' вложения',
											' вложений',
										])}
									</span>
								)}
								<PlusCircle
									size={20}
									className='cursor-pointer text-gray-400'
								/>
								<input
									multiple
									name='attachments'
									type='file'
									className='hidden'
									onChange={handlerFileChange}
								/>
							</label>
						)}
					</div>
				</div>
				<div className='flex gap-4 mt-2'>
					<Button
						isSubmit={true}
						text='Сохранить'
						className='w-full'
					/>
					<Button
						text='Отменить'
						isInverted={true}
						onClick={closeModal}
						className='w-full'
					/>
				</div>
			</form>
		</div>
	);
}
