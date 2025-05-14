'use client';

import { EllipsisVertical } from 'lucide-react';
import { useSelector } from 'react-redux';

import type { RootState } from '@/store';

interface IFunction {
	func: () => void;
	buttonText: string;
}

interface Props {
	user_id: number;
	funcs: IFunction[];
}

export function ItemFunctions({ user_id, funcs }: Props) {
	const userId = useSelector((state: RootState) => state.auth.auth.id);

	return (
		<div className='self-center ml-auto p-2 cursor-pointer rounded-full group hover:bg-gray-100 transition duration-100 relative'>
			<EllipsisVertical className='text-gray-400' />
			<div className='hidden items absolute z-10 right-0 top-[100%] !p-4 group-hover:block'>
				{userId === user_id &&
					funcs.map((funcsData, index) => (
						<button
							className='w-full text-left text-sm p-2 hover:bg-gray-100 transition duration-100'
							onClick={funcsData.func}
							key={index}
						>
							{funcsData.buttonText}
						</button>
					))}
			</div>
		</div>
	);
}
