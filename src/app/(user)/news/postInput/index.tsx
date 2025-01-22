'use client';

import Image from 'next/image';
import { type Dispatch, type SetStateAction, useRef, useState } from 'react';

import { Button } from '../../../../components/ui/buttons';

import styles from './PostInput.module.css';
import { postsService } from '@/services/post.services';

export const AutoResizeTextArea: React.FC<{
	inputName: string;
	inputPlaceholder: string;
	inputState: Dispatch<SetStateAction<string>>;
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
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [files, setFiles] = useState<FileList | null>(null);

	const handleSubmit = (e: React.FormEvent) => {
		try {
			e.preventDefault();

			postsService.addPost({ title, description });
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
					placeholder='Заголовок записи (необязательно)'
					onChange={e => setTitle(e.target.value)}
				/>
				<AutoResizeTextArea
					inputName={'description'}
					inputPlaceholder={'Напиши что-нибудь...'}
					inputState={setDescription}
				/>
				<div className={styles.inputButtons}>
					<input
						type='file'
						multiple
					/>
				</div>
			</div>
			<Button
				text='Отправить'
				isSubmit={true}
			/>
		</form>
	);
}
