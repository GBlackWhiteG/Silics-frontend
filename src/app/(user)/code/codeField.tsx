'use client';

// @ts-ignore
import hljs from 'highlight.js/lib/core';
import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui/buttons';

import { clearCodeAction } from '@/store/codeReducer';
import { setExecutedCodeAction } from '@/store/executerReducer';

import { executionService } from '@/services/execution.services';
import type { RootState } from '@/store';

export function CodeField() {
	const dispatch = useDispatch();

	const [code, setCode] = useState('<?php\n');
	const copiedCode = useSelector((state: RootState) => state.copiedCode.code);
	const [codeRowsLenght, setCodeRowsLenght] = useState(code.split('\n').length);
	const [activeLine, setActiveLine] = useState<number | null>(null);

	const [language, setLanguage] = useState('php');

	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		if (copiedCode) {
			setCode(copiedCode);
			dispatch(clearCodeAction());
			setCodeRowsLenght(copiedCode.split('\n').length);
		}
	}, [copiedCode, dispatch]);

	const buttonHandler = async () => {
		const response = await executionService.sendCodeToQueue({ code, language });
		if (response) {
			dispatch(setExecutedCodeAction(response.data.result));
		}
	};

	const textareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		setCode(value);
		setCodeRowsLenght(value.split('\n').length);
	};

	useEffect(() => {
		import(`highlight.js/lib/languages/${language}`)
			.then(module => {
				hljs.registerLanguage(language, module.default);
			})
			.catch(error => {
				console.log(`Не удалось загрузить язык: ${error}`);
			});
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

	return (
		<div className='grid grid-rows-[auto_1fr]'>
			<Button
				text={'Запуск'}
				onClick={buttonHandler}
				className='mb-2 justify-self-start'
			></Button>
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
							className='block'
							dangerouslySetInnerHTML={{ __html: hljs.highlightAuto(code).value }}
						/>
					</pre>
					<textarea
						name=''
						id=''
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
