interface Props {
	isOn: boolean | undefined;
	onClick: () => void;
}

export function ToggleSwitch({ isOn, onClick }: Props) {
	return (
		<div
			className={`max-w-[40px] h-[23px] w-full cursor-pointer self-center rounded-full border-[--primary] border-solid border transition relative ${isOn === undefined ? 'bg-gray-200 border-gray-200 cursor-not-allowed' : isOn ? 'bg-[--primary]' : ''}`}
			onClick={onClick}
		>
			<div
				className={`w-[15px] aspect-square rounded-full border-[--primary] border-solid border bg-white transition-all absolute top-[50%] translate-y-[-50%] ${isOn === undefined ? 'border-white left-[50%] translate-x-[-50%]' : isOn ? 'left-[calc(100%-3px)] translate-x-[-100%]' : 'left-[3px]'}`}
			></div>
		</div>
	);
}
