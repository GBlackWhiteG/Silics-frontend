'use client';

// @ts-ignore
import hljs from 'highlight.js/lib/core';
import { type ChangeEvent, type SelectHTMLAttributes, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui/buttons';

import { clearCodeAction } from '@/store/codeReducer';
import { setExecutedCodeAction } from '@/store/executerReducer';

import { laguagesInitalCodeData } from './languagesInitalCode.data';
import { executionService } from '@/services/execution.services';
import type { RootState } from '@/store';

export function CodeField() {
	const dispatch = useDispatch();

	const codeRef = useRef<HTMLElement | null>(null);
	const [code, setCode] = useState('');
	const copiedCode = useSelector((state: RootState) => state.copiedCode.code);
	const [codeRowsLenght, setCodeRowsLenght] = useState(1);
	const [activeLine, setActiveLine] = useState<number | null>(null);
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	const [language, setLanguage] = useState('php');

	useEffect(() => {
		if (copiedCode) {
			setCode(copiedCode);
			dispatch(clearCodeAction());
			setCodeRowsLenght(copiedCode.split('\n').length);
		}
	}, [copiedCode, dispatch]);

	useEffect(() => {
		if (!copiedCode && laguagesInitalCodeData[language]) {
			const code = laguagesInitalCodeData[language];
			setCode(code);
			setCodeRowsLenght(code.split('\n').length);
		}
	}, [language]);

	const [languageLoaded, setLanguageLoaded] = useState(false);

	useEffect(() => {
		const loadLanguageAndHighlight = async () => {
			setLanguageLoaded(false);
			if (!hljs.getLanguage(language)) {
				try {
					const module = await import(`highlight.js/lib/languages/${language}`);
					hljs.registerLanguage(language, module.default);
				} catch (error) {
					console.log(`Не удалось загрузить язык: ${error}`);
					return;
				}
			}
			setLanguageLoaded(true);
		};

		loadLanguageAndHighlight();
	}, [language]);

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

	const buttonHandler = async () => {
		const response = await executionService.sendCodeToQueue({ code, language });
		if (response) {
			dispatch(setExecutedCodeAction(response.data.result));
		}
	};

	const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setLanguage(name);
	};

	const textareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		setCode(value);
		setCodeRowsLenght(value.split('\n').length);
	};

	return (
		<div className='grid grid-rows-[auto_1fr]'>
			<div className='flex gap-2 items-center'>
				<Button
					text={'Запуск'}
					onClick={buttonHandler}
					className='mb-2 justify-self-start'
				></Button>
				<select
					value={language}
					onChange={handleChangeLanguage}
				>
					<option value='php'>PHP</option>
					<option value='javascript'>JS</option>
					<option value='python'>Python</option>
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
							className='block'
							dangerouslySetInnerHTML={{
								__html: languageLoaded ? hljs.highlight(code, { language }).value : '',
							}}
						></code>
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
