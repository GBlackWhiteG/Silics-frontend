'use client';

// @ts-ignore
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import 'highlight.js/styles/xcode.css';
import { BookMarked, Check, CopyIcon, Share } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui/buttons';

import { publicPage } from '@/config/public-page.config';

import { clearCodeRunAction } from '@/store/codeRunReducer';
import { setCodeShareAction } from '@/store/codeShareReducer';
import { setExecutedCodeAction } from '@/store/executerReducer';

import { DraftsModal } from './draftsModal';
import { laguagesInitalCodeData } from './languagesInitalCode.data';
import { executionService } from '@/services/execution.services';
import type { RootState } from '@/store';
import type { IDraft } from '@/types/draft.types';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('php', php);

export function CodeField({
	drafts,
	setDrafts,
}: {
	drafts: IDraft[];
	setDrafts: React.Dispatch<React.SetStateAction<IDraft[]>>;
}) {
	const dispatch = useDispatch();
	const router = useRouter();
	const runCodeButton = useRef<HTMLButtonElement | null>(null);
	const codeRef = useRef<HTMLElement | null>(null);
	const [code, setCode] = useState('');
	const [isCodeExecuting, setIsCodeExecuting] = useState(false);
	const copiedCode = useSelector((state: RootState) => state.copiedCode.codeData);
	const [codeRowsLenght, setCodeRowsLenght] = useState(1);
	const [activeLine, setActiveLine] = useState<number | null>(null);
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const [isCopied, setIsCopied] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [pastedDraft, setPastedDraft] = useState(false);
	const draftCode = useSelector((state: RootState) => state.draftedCode.codeData);

	const [language, setLanguage] = useState<string>('php');

	const savedCode = JSON.parse(localStorage.getItem('saved_code') || '{}');
	const savedLang = savedCode.language;

	useEffect(() => {
		if (copiedCode.code) {
			const { code, language } = copiedCode;
			setCode(code);
			setLanguage(language);
			setCodeRowsLenght(code.split('\n').length);
		} else if (savedCode.code) {
			const { code, language } = savedCode;
			setCode(code);
			setLanguage(language);
			setCodeRowsLenght(code.split('\n').length);
		} else {
			const code = laguagesInitalCodeData[language];
			setCode(code);
			setCodeRowsLenght(code.split('\n').length);
		}
	}, []);

	useEffect(() => {
		if (draftCode.code !== '' && draftCode.language !== '') {
			const dCode = draftCode.code;
			const dLang = draftCode.language;
			setCode(dCode);
			setPastedDraft(!(dLang === language));
			setLanguage(dLang);
			setCodeRowsLenght(dCode.split('\n').length);
		}
	}, [draftCode]);

	useEffect(() => {
		if (!pastedDraft) {
			let langCode = '';
			if (copiedCode.code && copiedCode.language === language) {
				langCode = copiedCode.code;
				dispatch(clearCodeRunAction());
			} else if (savedLang === language) {
				langCode = savedCode.code;
			} else if (laguagesInitalCodeData[language]) {
				langCode = laguagesInitalCodeData[language];
			}
			setCode(langCode);
			setCodeRowsLenght(langCode.split('\n').length);
		}
		setPastedDraft(false);
	}, [language]);

	useEffect(() => {
		if (runCodeButton.current) {
			runCodeButton.current.disabled = isCodeExecuting;
		}
	}, [isCodeExecuting]);

	useEffect(() => {
		if (codeRef.current) {
			try {
				delete codeRef.current.dataset.highlighted;
				hljs.highlightElement(codeRef.current);
			} catch (error) {
				console.error(`Ошибка подсветки кода для языка ${language}:`, error);
			}
		}
	}, [language, code]);

	const getCaretLine = () => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		const activeRow = textarea.value.slice(0, textarea.selectionStart).split('\n').length;
		setActiveLine(activeRow);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		if (e.key === 'Tab') {
			e.preventDefault();
			const start = textarea.selectionStart;
			const end = textarea.selectionEnd;
			const value = textarea.value;

			textarea.value = value.slice(0, start) + '\t' + value.slice(end);
			textarea.selectionStart = textarea.selectionEnd = start + 1;
		}

		if ((e.ctrlKey || e.metaKey) && e.key === 's') {
			e.preventDefault();
			localStorage.setItem('saved_code', JSON.stringify({ language, code }));
			toast.success('Данные сохранены');
		}
	};

	const runButtonHandler = async () => {
		setIsCodeExecuting(true);
		const response = await executionService.sendCodeToQueue({ code, language }).finally(() => {
			setIsCodeExecuting(false);
		});
		if (response) {
			dispatch(setExecutedCodeAction(response.data.result));
		}
	};

	const shareButtonHandler = () => {
		const data = { code, language };
		dispatch(setCodeShareAction(data));
		router.push(publicPage.NEWS);
	};

	const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setLanguage(value);
	};

	const textareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		setCode(value);
		setCodeRowsLenght(value.split('\n').length);
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(code || '');
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<>
			{isModalOpen && (
				<DraftsModal
					drafts={drafts}
					setDrafts={setDrafts}
					saveCode={code}
					saveLang={language}
					closeModal={() => setIsModalOpen(false)}
				/>
			)}
			<div className='h-full grid grid-rows-[auto_1fr]'>
				<div className='flex gap-2 mb-2'>
					<Button
						text={'Запуск'}
						ref={runCodeButton}
						onClick={runButtonHandler}
						className='justify-self-start'
					></Button>
					<div
						className='bg-[--primary] rounded-md p-2 justify-self-end cursor-pointer ml-auto'
						onClick={shareButtonHandler}
						title='Поделиться'
					>
						<Share
							size={16}
							className='text-white font-bold'
						/>
					</div>
					<div
						className='bg-[--primary] rounded-md p-2 justify-self-end cursor-pointer'
						onClick={copyToClipboard}
						title='Скопировать'
					>
						{isCopied ? (
							<Check
								size={16}
								className='text-white'
							/>
						) : (
							<CopyIcon
								size={16}
								className='text-white'
							/>
						)}
					</div>
					<div
						className='bg-[--primary] rounded-md p-2 justify-self-end cursor-pointer'
						onClick={() => setIsModalOpen(true)}
						title='Сохранить черновики'
					>
						<BookMarked
							size={16}
							className='text-white'
						/>
					</div>
					<select
						value={language}
						onChange={e => handleChangeLanguage(e)}
						className='h-full justify-self-end border-solid border-2 border-[--primary] rounded-md mr-2'
					>
						<option value='php'>PHP</option>
						<option value='python'>Python</option>
						<option value='javascript'>JavaScript</option>
					</select>
				</div>
				<div className='flex font-mono'>
					<ul className='w-[50px] text-right bg-[#F1F1F1]'>
						{Array.from({ length: codeRowsLenght }, (_, i) => i + 1).map(num => (
							<li
								key={num}
								className={`pr-3 ${activeLine === num ? 'bg-gray-200' : ''}`}
							>
								{num}
							</li>
						))}
					</ul>
					<div className='w-full h-full flex relative'>
						<pre className='whitespace-pre-wrap break-words'>
							<code
								ref={codeRef}
								className={`language-${language} !p-0 !bg-transparent`}
								data-lang={language}
							>
								{code}
							</code>
						</pre>
						<textarea
							value={code}
							ref={textareaRef}
							onFocus={getCaretLine}
							onClick={getCaretLine}
							onChange={e => textareaHandler(e)}
							onKeyUp={getCaretLine}
							onKeyDown={e => {
								getCaretLine();
								handleKeyDown(e);
							}}
							className='w-full h-full border-solid border-r border-transparent border-right rounded-none focus:outline-none resize-none absolute top-0 left-0 text-transparent caret-black xl:border-black'
						></textarea>
					</div>
				</div>
			</div>
		</>
	);
}
