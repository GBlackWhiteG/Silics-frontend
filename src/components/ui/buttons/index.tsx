import Link from 'next/link';
import styles from './Buttons.module.css';
import { FormEventHandler, MouseEventHandler } from 'react';

interface ButtonProps {
    text: string;
    isSubmit?: boolean;
    click?: MouseEventHandler | FormEventHandler | undefined;
}

interface ButtonLinkProps {
    text: string;
    href: string | undefined;
    func?: MouseEventHandler<HTMLAnchorElement> | undefined;
}

export const Button: React.FC<ButtonProps> = ({text, isSubmit = false, click = undefined}) => {
    return (
        <button className={styles.button} type={isSubmit ? 'submit' : 'button'} onClick={click}>
            {text}
        </button>
    )
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({text, href = '', func = undefined}) => {
    return (
        <Link className={styles.button} href={href} onClick={func}>
            {text}
        </Link>
    );
}