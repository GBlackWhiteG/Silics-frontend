'use client';

import { Code, ImagePlus, Paperclip } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AutoResizeTextArea } from '@/components/ui/autoResizeTextarea/autoResizeTextarea';
import { Button } from '@/components/ui/buttons';

import { addNewCommentAction } from '@/store/newCommentReducer';

import { commentServices } from '@/services/comment.services';

export function CommentInput({ postId }: { postId: number }) {
	const dispatch = useDispatch();
	const [isCodeOpen, setCodeOpen] = useState(false);

	const [formData, setFormData] = useState({
		content: '',
		code: '',
		language: 'php',
		files: null as FileList | null,
	});

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({ ...prev, files: e.target.files }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { content, code, language, files } = formData;

		const formDataToSend = new FormData(e.currentTarget);
		formDataToSend.append('post_id', postId.toString());
		formDataToSend.append('content', content);
		formDataToSend.append('code', code);
		formDataToSend.append('prog_language', language);

		if (files) {
			Array.from(files).forEach(file => {
				formDataToSend.append('files[]', file);
			});
		}

		try {
			const response = await commentServices.addComment(formDataToSend);
			dispatch(addNewCommentAction(response));
			setFormData({ content: '', code: '', language: 'php', files: null });
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='grid grid-cols-[auto_1fr_auto_auto] gap-4'
		>
			<Image
				src='/anonymous.jpg'
				width={40}
				height={40}
				alt=''
			></Image>
			<div>
				<div className='relative'>
					<AutoResizeTextArea
						inputName='content'
						inputPlaceholder='Ваш комментарий'
						value={formData.content}
						inputState={(value: string) => setFormData(prev => ({ ...prev, content: value }))}
					/>
					<Code
						className='absolute top-2 right-2 cursor-pointer text-gray-400'
						onClick={() => setCodeOpen(prev => !prev)}
					/>
				</div>
				{isCodeOpen && (
					<div className='relative'>
						<AutoResizeTextArea
							inputName={'code'}
							inputPlaceholder={'Код'}
							value={formData.code}
							inputState={(value: string) => setFormData(prev => ({ ...prev, code: value }))}
						/>
						<select
							name='prog_language'
							id='code_language_select'
							className='absolute top-2 right-2'
							value={formData.language}
							onChange={e => setFormData(prev => ({ ...prev, language: e.target.value }))}
						>
							<option value='php'>PHP</option>
							<option value='python'>Python</option>
							<option value='javascript'>JavaScript</option>
						</select>
					</div>
				)}
			</div>
			<div className='flex gap-3'>
				<label className='h-[40px] flex items-center justify-center cursor-pointer'>
					<ImagePlus className='text-blue-500' />
					{formData.files && formData.files?.length > 0 ? formData.files.length : null}
					<input
						type='file'
						className='hidden'
						onChange={handleFileChange}
					/>
				</label>
				<label className='h-[40px] flex items-center justify-center cursor-pointer'>
					<Paperclip className='text-green-500' />
					<input
						type='file'
						className='hidden'
					/>
				</label>
			</div>
			<Button
				text='Отправить'
				isSubmit={true}
				className='max-h-10'
			/>
		</form>
	);
}
