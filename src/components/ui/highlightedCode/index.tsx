'use client';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import 'highlight.js/styles/xcode.css';
import { Check, Copy, Play } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { publicPage } from '@/config/public-page.config';

import { setCodeRunAction } from '@/store/codeRunReducer';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('php', php);

interface Props {
	code: string;
	language: string;
}

export function HighlightedCode({ code, language }: Props) {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const codeRef = useRef<HTMLElement | null>(null);
	const [isLongCode, setIsLongCode] = useState(false);
	const [isFullCode, setIsFullCode] = useState(false);
	const [isCopied, setIsCopied] = useState(false);
	const router = useRouter();
	const dispatch = useDispatch();

	const copyToClipboard = () => {
		navigator.clipboard.writeText(code || '');
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	const runCopiedCode = () => {
		const data = { code, language };
		dispatch(setCodeRunAction(data));
		router.push(publicPage.CODE);
	};

	const showFullCode = () => {
		setIsFullCode(prev => !prev);
		setIsLongCode(prev => !prev);
	};

	useEffect(() => {
		if (codeRef.current) {
			try {
				delete codeRef.current.dataset.highlighted;
				hljs.highlightElement(codeRef.current);
			} catch (error) {
				console.error(`Ошибка подсветки кода для языка ${language}:`, error);
			}
		}
		if (containerRef.current) {
			const el = containerRef.current;
			if (el.scrollHeight > el.clientHeight) {
				setIsLongCode(true);
			}
		}
	}, [language, code]);

	return (
		<>
			<div
				className={`${!isFullCode && 'max-h-[150px]'} overflow-hidden relative group`}
				ref={containerRef}
			>
				<pre className='whitespace-pre-wrap break-words bg-[#F5F5F5] p-2'>
					<code
						ref={codeRef}
						className={`language-${language} !bg-transparent !p-0`}
						data-lang={language}
					>
						{code}
					</code>
				</pre>
				<div className='flex gap-2 absolute text-sm top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-100'>
					<div className='relative'>
						<Copy
							onClick={copyToClipboard}
							size={22}
							className={`cursor-pointer text-gray-400 ${!isCopied ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 z-10`}
						/>
						<Check
							size={22}
							className={`text-gray-400 ${isCopied ? 'opacity-100' : 'opacity-0'}`}
						/>
					</div>
					<Play
						onClick={runCopiedCode}
						size={22}
						className='cursor-pointer text-gray-400'
					/>
				</div>
				{isLongCode && (
					<div className='h-[70px] w-full flex justify-center items-end bg-gradient-to-t from-[#f5f5f5] to-transparent absolute bottom-0 left-0'>
						<span
							className='cursor-pointer py-1 px-2 text-[--primary]'
							onClick={showFullCode}
						>
							Смотреть полностью
						</span>
					</div>
				)}
			</div>
		</>
	);
}
