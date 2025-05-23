import clsx from 'clsx';
import Link from 'next/link';
import type {
	ButtonHTMLAttributes,
	FormEventHandler,
	MouseEventHandler,
	MutableRefObject,
} from 'react';

import styles from './Buttons.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
	isSubmit?: boolean;
	click?: MouseEventHandler | FormEventHandler | undefined;
	ref?: MutableRefObject<HTMLButtonElement | null>;
}

interface ButtonLinkProps {
	text: string;
	href: string | undefined;
	func?: MouseEventHandler<HTMLAnchorElement> | undefined;
}

export const Button: React.FC<ButtonProps> = ({
	text,
	isSubmit = false,
	click = undefined,
	className,
	...props
}) => {
	return (
		<button
			className={clsx(styles.button, className)}
			type={isSubmit ? 'submit' : 'button'}
			onClick={click}
			{...props}
		>
			{text}
		</button>
	);
};

export const ButtonLink: React.FC<ButtonLinkProps> = ({ text, href = '', func = undefined }) => {
	return (
		<Link
			className={styles.button}
			href={href}
			onClick={func}
		>
			{text}
		</Link>
	);
};

export const ButtonSkeleton = () => {
	return (
		<button className={clsx(styles.button, styles['button-skeleton'], '!bg-gray-300')}></button>
	);
};
