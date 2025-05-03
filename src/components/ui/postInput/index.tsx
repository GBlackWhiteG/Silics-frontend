'use client';

import { Code, Heading, ImagePlus, Paperclip } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui/buttons';

import { clearCodeShareAction } from '@/store/codeShareReducer';

import { AutoResizeTextArea } from '../autoResizeTextarea/autoResizeTextarea';

import styles from './PostInput.module.css';
import { postsService } from '@/services/post.services';
import type { RootState } from '@/store';
import type { IPost } from '@/types/post.types';

interface Props {
	stateNewPost?: (post: IPost) => void;
}

export function PostInput(props: Props) {
	const dispatch = useDispatch();
	const sharedCodeData = useSelector((state: RootState) => state.sharedCode.codeData);
	const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

	const [formOptions, setFormOptions] = useState({
		header: false,
		code: false,
	});

	const fileInputRef = useRef<HTMLInputElement>(null);

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		code: '',
		prog_language: 'php',
		files: null as FileList | null,
	});

	useEffect(() => {
		if (sharedCodeData.code) {
			setFormData(prev => ({
				...prev,
				code: sharedCodeData.code,
				prog_language: sharedCodeData.language,
			}));
			setFormOptions(prev => ({ ...prev, code: true }));
			dispatch(clearCodeShareAction());
		}
	}, [sharedCodeData, dispatch]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({ ...prev, files: e.target.files }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const { title, description, code, prog_language, files } = formData;
		const formDataToSend = new FormData();

		formDataToSend.append('title', title);
		formDataToSend.append('description', description);
		formDataToSend.append('code', code);
		formDataToSend.append('prog_language', prog_language);

		if (files) {
			Array.from(files).forEach(file => {
				formDataToSend.append('files[]', file);
			});
		}

		try {
			const response = await postsService.addPost(formDataToSend);
			if (response.status === 200 && props.stateNewPost) {
				props.stateNewPost(response.data);
				setFormData({
					title: '',
					description: '',
					code: '',
					prog_language: 'php',
					files: null,
				});
				if (fileInputRef.current) {
					fileInputRef.current.value = '';
				}
			}
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
							value={formData.title}
							placeholder='Заголовок'
							onChange={handleChange}
						/>
					)}
					<div className='relative'>
						<AutoResizeTextArea
							inputName={'description'}
							inputPlaceholder={'Как у вас дела?'}
							value={formData.description}
							inputState={(value: string) => setFormData(prev => ({ ...prev, description: value }))}
							// onFocus={() => setIsInputFocused(true)}
							// onBlur={() => setIsInputFocused(false)}
						/>
						<div
							className={`flex gap-2 absolute top-2 right-2 transition-opacity duration-100 ${isInputFocused ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
						>
							<Heading
								className='cursor-pointer text-gray-400'
								onClick={() => setFormOptions(prev => ({ ...prev, header: !prev.header }))}
								size={22}
							/>
							<Code
								className='cursor-pointer text-gray-400'
								onClick={() => setFormOptions(prev => ({ ...prev, code: !prev.code }))}
								size={22}
							/>
						</div>
					</div>
					{formOptions.code && (
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
								className={styles.select}
								value={formData.prog_language}
								onChange={handleChange}
							>
								<option value='php'>PHP</option>
								<option value='python'>Python3</option>
								<option value='javascript'>JavaScript</option>
							</select>
						</div>
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
					ref={fileInputRef}
					onChange={handleFileChange}
					className='hidden'
				/>
				<label
					htmlFor='images'
					className='cursor-pointer flex gap-1'
				>
					<ImagePlus className='text-blue-500' />
					<span>Изображения {formData.files && `(${formData.files.length})`}</span>
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
			</div>
		</form>
	);
}
