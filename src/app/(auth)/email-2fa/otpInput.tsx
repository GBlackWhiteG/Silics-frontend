'use client';

import React, { useEffect, useRef, useState } from 'react';

import styles from './Email2fa.module.css';

export function OtpInput({
	lenght = 6,
	onComplete,
}: {
	lenght?: number;
	onComplete: (otp: string) => void;
}) {
	const [otp, setOtp] = useState(Array(lenght).fill(''));
	const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

	useEffect(() => {
		if (otp.join('').length === lenght) onComplete(otp.join(''));
	}, [otp]);

	const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, '');

		if (value) {
			const newOtp = [...otp];
			newOtp[index] = value.slice(-1);
			setOtp(newOtp);

			if (index < lenght - 1) {
				inputsRef.current[index + 1]?.focus();
			}
		}
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Backspace' && !otp[index] && index > 0) {
			inputsRef.current[index - 1]?.focus();
			const newOtp = [...otp];
			newOtp[index - 1] = '';
			setOtp(newOtp);
		} else if (e.key === 'Backspace' && index > 0) {
			const newOtp = [...otp];
			newOtp[index] = '';
			setOtp(newOtp);
		}
	};

	const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
		const code = e.clipboardData.getData('text');
		const newOtp = code.slice(0, lenght - index).split('');

		setOtp(prev => {
			const pastedOtp = [...prev];
			newOtp.forEach((char, i) => {
				pastedOtp[index + i] = char;
			});

			return pastedOtp;
		});

		inputsRef.current[index + newOtp.length - 1]?.focus();
	};

	return (
		<div className={styles.inputsBlock}>
			{otp.map((_, index) => (
				<input
					key={index}
					ref={el => {
						inputsRef.current[index] = el;
					}}
					type='text'
					maxLength={1}
					value={otp[index]}
					onChange={e => handleChange(index, e)}
					onKeyDown={e => handleKeyDown(index, e)}
					onPaste={e => handlePaste(index, e)}
					className='w-10 text-3xl'
				/>
			))}
		</div>
	);
}
