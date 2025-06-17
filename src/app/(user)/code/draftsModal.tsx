'use client';

import { useEffect, useState } from 'react';
import type { Dispatch } from 'redux';

import { Button } from '@/components/ui/buttons';

import type { IDraft } from '@/types/draft.types';

interface Props {
	drafts: IDraft[];
	setDrafts: React.Dispatch<React.SetStateAction<IDraft[]>>;
	saveCode: string;
	saveLang: string;
	closeModal: () => void;
}

export function DraftsModal({ drafts, setDrafts, saveCode, saveLang, closeModal }: Props) {
	const [name, setName] = useState('');
	const [code, setCode] = useState(saveCode);
	const [language, setLanguage] = useState(saveLang);

	useEffect(() => {
		setDrafts(JSON.parse(localStorage.getItem('drafts') || '[]'));
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setLanguage(value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newDraft = { id: Math.random().toString(36).substring(2, 10), name, code, lang: language };
		const updatedDrafts = [...drafts, newDraft];
		localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
		setDrafts(updatedDrafts);
		closeModal();
	};

	return (
		<div className='w-full h-full flex justify-center items-center bg-black bg-opacity-60 fixed top-0 left-0 z-[11]'>
			<div className='items max-w-xl w-full'>
				<h3 className='text-xl mb-4'>Сохранить черновик</h3>
				<form
					className='flex flex-col gap-4'
					onSubmit={handleSubmit}
				>
					<label className='flex flex-col gap-1'>
						<span>Название</span>
						<input
							type='text'
							onChange={e => setName(e.target.value)}
						/>
					</label>
					<label className='flex flex-col gap-1'>
						<span>Код</span>
						<div className='relative'>
							<textarea
								rows={6}
								className='w-full p-2'
								onChange={e => setCode(e.target.value)}
								value={code}
							/>
							<select
								value={language}
								className='justify-self-end border-solid border-2 border-[--primary] rounded-md mr-2 absolute top-3 right-0.5'
								onChange={handleChange}
							>
								<option value='php'>PHP</option>
								<option value='python'>Python</option>
								<option value='javascript'>JavaScript</option>
							</select>
						</div>
					</label>
					<div className='flex gap-2'>
						<Button
							text='Сохранить'
							className='w-full'
							isSubmit={true}
						/>
						<Button
							text='Отменить'
							isInverted={true}
							className='w-full'
							onClick={closeModal}
						/>
					</div>
				</form>
			</div>
		</div>
	);
}
