import { type Dispatch, type SetStateAction, useState } from 'react';

import styles from './AnimatedInput.module.css';

interface InputProps {
	inputText: string;
	inputType: string;
	inputName: string;
	inputState: Dispatch<SetStateAction<string>>;
}

export const AnimateInput: React.FC<InputProps> = ({
	inputText,
	inputType,
	inputName,
	inputState,
}) => {
	const [isAnimated, setAnimated] = useState(false);

	const handleFocus = () => {
		setAnimated(true);
	};

	const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		if (!event.target.value.trim()) {
			setAnimated(false);
		}
	};

	return (
		<div className={`${styles.inputWrapper} ${isAnimated ? styles.inputActive : ''}`}>
			<label className={`${styles.label} ${isAnimated ? styles.labelActive : ''}`}>
				{inputText}
			</label>
			<input
				className='border-[1px] border-gray-100'
				name={inputName}
				type={inputType}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChange={e => {
					inputState(e.target.value);
					setAnimated(e.target.value.trim() !== '');
				}}
			/>
		</div>
	);
};
