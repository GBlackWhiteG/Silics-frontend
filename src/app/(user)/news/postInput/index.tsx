'use client';

import Image from 'next/image';
import { type Dispatch, type SetStateAction, useRef, useState } from 'react';

import { Button } from '../../../../components/ui/buttons';

import styles from './PostInput.module.css';
import { postsService } from '@/services/post.services';
import { ImagePlus } from 'lucide-react';

export const AutoResizeTextArea: React.FC<{
	inputName: string;
	inputPlaceholder: string;
	inputState: (value: string) => void;
}> = ({ inputName, inputPlaceholder, inputState }) => {
	const [isActive, setIsActive] = useState(false);
	const [content, setContent] = useState('');
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		inputState(event.target.value);
		setContent(event.target.value);

		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	};

	return (
		<textarea
			name={inputName}
			ref={textareaRef}
			onChange={handleInputChange}
			onFocus={() => setIsActive(true)}
			onBlur={() => setIsActive(false)}
			placeholder={inputPlaceholder}
			value={content}
			cols={25}
			rows={isActive ? 2 : 1}
			className=''
		></textarea>
	);
};

export function PostInput() {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
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

		const { title, description, files } = formData;
		const formDataToSend = new FormData();

		formDataToSend.append('title', title);
		formDataToSend.append('description', description);

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
			className={styles.postInput}
			onSubmit={handleSubmit}
		>
			<div className={styles.wrapperImage}>
				<Image
					src='/anonymous.jpg'
					width={40}
					height={40}
					alt='user-avatar'
				></Image>
			</div>
			<div className={styles.inputs}>
				<input
					type='text'
					name='title'
					placeholder='Заголовок'
					onChange={handleChange}
				/>
				<AutoResizeTextArea
					inputName={'description'}
					inputPlaceholder={'Как ваши дела?'}
					inputState={(value: string) => setFormData(prev => ({ ...prev, description: value }))}
				/>
				<div className={styles.inputButtons}>
					<input
						id='images'
						type='file'
						multiple
						onChange={handleFileChange}
						className='hidden'
					/>
					<label htmlFor="images" className='cursor-pointer flex gap-1'><ImagePlus className='text-blue-500' /><span >Изображения/!Видео {formData.files && `(${formData.files.length})`}</span></label>
				</div>
			</div>
			<Button
				text='Отправить'
				isSubmit={true}
			/>
		</form>
	);
}
