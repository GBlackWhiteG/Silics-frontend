'use client';

import { EllipsisVertical } from 'lucide-react';

interface IFunction {
	func: () => void;
	buttonText: string;
}

interface Props {
	funcs: IFunction[];
}

export function ItemFunctions({ funcs }: Props) {
	return (
		<div className='self-center ml-auto p-2 cursor-pointer rounded-full group hover:bg-gray-100 transition duration-100 relative'>
			<EllipsisVertical className='text-gray-400' />
			<div className='hidden items absolute z-10 right-50% top-[100%] translate-x-[-50%] !p-4 group-hover:block'>
				{funcs.map((funcsData, index) => (
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
