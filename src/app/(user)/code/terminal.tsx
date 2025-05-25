'use client';

import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui/buttons';

import { clearExecutedCodeAction } from '@/store/executerReducer';

import type { RootState } from '@/store';

export function Terminal() {
	const executedCode = useSelector((state: RootState) => state.code.result);

	const dispatch = useDispatch();

	const buttonHandler = () => {
		dispatch(clearExecutedCodeAction());
	};

	return (
		<div className='grid grid-rows-[auto_1fr]'>
			<div className='flex justify-between items-center pl-2 pr-2'>
				<span>Вывод</span>
				<Button
					text={'Очистить'}
					className='mb-2 justify-self-end'
					isInverted={true}
					onClick={buttonHandler}
				></Button>
			</div>
			<textarea
				name=''
				id=''
				className='w-full p-2 resize-none font-mono'
				value={
					executedCode
						? `${executedCode.code_result}\n\n${executedCode.execution_time ? `Время исполнения: ${executedCode.execution_time}` : ''}`
						: ''
				}
				readOnly
			></textarea>
		</div>
	);
}
