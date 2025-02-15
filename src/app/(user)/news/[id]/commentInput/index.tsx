'use client';

import { Code } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { AutoResizeTextArea } from '@/components/ui/autoResizeTextarea/autoResizeTextarea';
import { Button } from '@/components/ui/buttons';

import styles from './CommentInput.module.css';
import { commentServices } from '@/services/comment.services';

export function CommentInput({ postId }: { postId: number }) {
	const [isCodeOpen, setCodeOpen] = useState(false);

	const [formData, setFormData] = useState({
		content: '',
		code: '',
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { content, code } = formData;

		const formDataToSend = new FormData(e.currentTarget);
		formDataToSend.append('post_id', postId.toString());
		formDataToSend.append('content', content);
		formDataToSend.append('code', code);

		try {
			commentServices.addComment(formDataToSend);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='grid grid-cols-[auto_1fr_auto] gap-4'
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
						inputState={(value: string) => setFormData(prev => ({ ...prev, content: value }))}
					/>
					<Code
						className='absolute top-2 right-2 hover:cursor-pointer text-gray-400'
						onClick={() => setCodeOpen(prev => !prev)}
					/>
				</div>
				{isCodeOpen && (
					<AutoResizeTextArea
						inputName='code'
						inputPlaceholder='Ваш код'
						inputState={(value: string) => setFormData(prev => ({ ...prev, code: value }))}
					/>
				)}
			</div>
			<Button
				text='Отправить'
				isSubmit={true}
				className='max-h-10'
			/>
		</form>
	);
}
