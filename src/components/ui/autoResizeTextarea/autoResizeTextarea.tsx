'use client';

import { type TextareaHTMLAttributes, useEffect, useRef, useState } from 'react';

import styles from './AutoResizeTextarea.module.css';

interface AutoResizeTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	inputName: string;
	inputPlaceholder: string;
	inputState: (value: string) => void;
}

export const AutoResizeTextArea = ({
	inputName,
	inputPlaceholder,
	inputState,
	...props
}: AutoResizeTextAreaProps) => {
	const [isActive, setIsActive] = useState(false);
	const [content, setContent] = useState('');
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const resizeTextarea = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			const minRows = isActive ? 2 : 1;
			const lineHeight = parseFloat(getComputedStyle(textareaRef.current).lineHeight);
			const minHeight = lineHeight * minRows;
			textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, minHeight)}px`;
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		inputState(event.target.value);
		setContent(event.target.value);
		resizeTextarea();
	};

	useEffect(() => {
		resizeTextarea();
	}, [content, isActive]);

	return (
		<textarea
			className={styles.autoResizeTextarea}
			name={inputName}
			ref={textareaRef}
			onChange={handleInputChange}
			onFocus={() => setIsActive(true)}
			onBlur={() => setIsActive(false)}
			placeholder={inputPlaceholder}
			value={content}
			cols={25}
			rows={isActive ? 2 : 1}
			{...props}
		></textarea>
	);
};
