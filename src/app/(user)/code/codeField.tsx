'use client';

// @ts-ignore
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import 'highlight.js/styles/xcode.css';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui/buttons';

import { publicPage } from '@/config/public-page.config';

import { clearCodeRunAction } from '@/store/codeRunReducer';
import { setCodeShareAction } from '@/store/codeShareReducer';
import { setExecutedCodeAction } from '@/store/executerReducer';

import { laguagesInitalCodeData } from './languagesInitalCode.data';
import { executionService } from '@/services/execution.services';
import type { RootState } from '@/store';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('php', php);

export function CodeField() {
	const dispatch = useDispatch();
	const router = useRouter();

	const codeRef = useRef<HTMLElement | null>(null);
	const [code, setCode] = useState('');
	const copiedCode = useSelector((state: RootState) => state.copiedCode.codeData);
	const [codeRowsLenght, setCodeRowsLenght] = useState(1);
	const [activeLine, setActiveLine] = useState<number | null>(null);
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	const [language, setLanguage] = useState<string>('php');

	useEffect(() => {
		if (copiedCode.code) {
			const { code, language } = copiedCode;
			setCode(code);
			setLanguage(language);
			setCodeRowsLenght(code.split('\n').length);
			dispatch(clearCodeRunAction());
		}
	}, [copiedCode]);

	useEffect(() => {
		if (!copiedCode.code && laguagesInitalCodeData[language]) {
			const code = laguagesInitalCodeData[language];
			setCode(code);
			setCodeRowsLenght(code.split('\n').length);
		}
	}, [language, dispatch]);

	useEffect(() => {
		if (codeRef.current) {
			try {
				delete codeRef.current.dataset.highlighted;
				//@ts-ignore
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
	};

	const runButtonHandler = async () => {
		const response = await executionService.sendCodeToQueue({ code, language });
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

	return (
		<div className='grid grid-rows-[auto_1fr]'>
			<div className='flex gap-2 items-center mb-2'>
				<Button
					text={'Запуск'}
					onClick={runButtonHandler}
					className='justify-self-start'
				></Button>
				<Button
					text={'Поделиться'}
					onClick={shareButtonHandler}
				/>
				<select
					value={language}
					onChange={e => handleChangeLanguage(e)}
					className='h-full'
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
						className='w-full h-full border-solid border-r border-black border-right rounded-none focus:outline-none resize-none absolute top-0 left-0 text-transparent caret-black'
					></textarea>
				</div>
			</div>
		</div>
	);
}
