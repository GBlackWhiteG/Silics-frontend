'use client';

import type { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { Code, Heading, ImagePlus, Paperclip } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui/buttons';

import { clearCodeShareAction } from '@/store/codeShareReducer';

import { AutoResizeTextArea } from '../autoResizeTextarea/autoResizeTextarea';
import { UserAvatar } from '../userAvatar';

import styles from './PostInput.module.css';
import { EnumTokens } from '@/enums/auth.enums';
import { postsService } from '@/services/post.services';
import type { RootState } from '@/store';
import type { IPostFull } from '@/types/post.types';

interface Props {
	stateNewPost?: (post: IPostFull) => void;
}

export function PostInput(props: Props) {
	const dispatch = useDispatch();
	const userAvatar = useSelector((state: RootState) => state.auth.auth.avatar_url);
	const sharedCodeData = useSelector((state: RootState) => state.sharedCode.codeData);

	const [formOptions, setFormOptions] = useState({
		header: false,
		code: false,
	});

	const fileInputRef = useRef<HTMLInputElement>(null);

	const [isAuth, setIsAuth] = useState(false);
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		code: '',
		prog_language: 'php',
		files: null as FileList | null,
		attachments: null as FileList | null,
	});

	useEffect(() => {
		setIsAuth(!!Cookies.get(EnumTokens.ACCESS_TOKEN));
	}, []);

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
		const { name } = e.target;
		setFormData(prev => ({ ...prev, [name]: e.target.files }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const { title, description, code, prog_language, files, attachments } = formData;
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

		if (attachments) {
			Array.from(attachments).forEach(attachment => {
				formDataToSend.append('attachments[]', attachment);
			});
		}

		try {
			const response = await postsService.addPost(formDataToSend);
			if (response && response.status === 201 && props.stateNewPost) {
				props.stateNewPost(response.data);
				setFormData({
					title: '',
					description: '',
					code: '',
					prog_language: 'php',
					files: null,
					attachments: null,
				});
				if (fileInputRef.current) {
					fileInputRef.current.value = '';
				}
			}
		} catch (err: AxiosError | any) {
			const errorMessage = err?.response.data?.errors || err?.message;

			let message = '';
			if (errorMessage) {
				for (const [key, value] of Object.entries(errorMessage)) {
					if (value instanceof Array) {
						message += `${key}: ${value[0]}\n`;
					} else {
						message += `${key}: ${value}\n`;
					}
				}
			}

			toast.error(message);
		}
	};

	return (
		<form
			className='flex flex-col gap-7 w-full rounded-lg p-4 bg-foreground'
			onSubmit={handleSubmit}
		>
			<div className='grid grid-cols-[1fr] gap-2 md:grid-cols-[auto_1fr_auto] md:gap-4'>
				<div className={`${styles.wrapperImage} hidden md:block`}>
					<UserAvatar
						userAvatarUrl={userAvatar}
						userName='user-avatar'
						avatarWidth={40}
					/>
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
					<div className={`relative ${styles.contentInputWrapper}`}>
						<AutoResizeTextArea
							inputName={'description'}
							inputPlaceholder={'Как у вас дела?'}
							value={formData.description}
							inputState={(value: string) => setFormData(prev => ({ ...prev, description: value }))}
						/>
						<div
							className={`flex gap-2 absolute top-2 right-2 transition-opacity duration-100 ${styles.textareaEl}`}
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
						<div className={`relative ${styles.contentInputWrapper}`}>
							<AutoResizeTextArea
								inputName={'code'}
								inputPlaceholder={'Код'}
								value={formData.code}
								inputState={(value: string) => setFormData(prev => ({ ...prev, code: value }))}
							/>
							<select
								name='prog_language'
								id='code_language_select'
								className={`${styles.select} ${styles.textareaEl}`}
								value={formData.prog_language}
								onChange={handleChange}
							>
								<option value='php'>PHP</option>
								<option value='python'>Python</option>
								<option value='javascript'>JavaScript</option>
							</select>
						</div>
					)}
				</div>
				<Button
					text='Отправить'
					isSubmit={true}
					className='max-h-10'
					disabled={!isAuth}
				/>
			</div>
			<div className='flex gap-4 justify-between sm:justify-start'>
				<input
					id='images'
					type='file'
					name='files'
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
					name='attachments'
					multiple
					onChange={handleFileChange}
					className='hidden'
				/>
				<label
					htmlFor='files'
					className='cursor-pointer flex gap-1'
				>
					<Paperclip className='text-green-500' />
					<span>Вложения {formData.attachments && `(${formData.attachments.length})`}</span>
				</label>
			</div>
		</form>
	);
}
