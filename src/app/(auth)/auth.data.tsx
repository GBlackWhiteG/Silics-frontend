'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/buttons';

import styles from './Auth.module.css';
import { AnimateInput } from './animatedInput/animatedInput';
import { authServices } from '@/services/auth.services';

interface FormProps {
	isActive: boolean;
}

export const Login: React.FC<FormProps> = ({ isActive }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await authServices.main('login', { email, password });
			router.push('/news');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={`${styles.login} ${isActive ? styles.activeForm : ''}`}>
			<h2>Вход</h2>
			<form
				action=''
				className={styles.loginForm}
			>
				<AnimateInput
					inputName='email'
					inputText='Эл.почта/номер тел.'
					inputType='text'
					inputState={setEmail}
				/>
				<AnimateInput
					inputName='password'
					inputText='Пароль'
					inputType='password'
					inputState={setPassword}
				/>
				<Button
					text='Вход'
					isSubmit={false}
					click={handleLogin}
				/>
			</form>
		</div>
	);
};

export const Signup: React.FC<FormProps> = ({ isActive }) => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

	const handleSignup = (e: React.FormEvent) => {
		e.preventDefault();
		try {
			authServices.main('register', {
				email,
				name,
				password,
				password_confirmation: passwordConfirmation,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={`${styles.signup} ${isActive ? styles.activeForm : ''}`}>
			<h2>Регистрация</h2>
			<form
				action=''
				className={styles.signupForm}
			>
				<div className={styles.inputWrapper}>
					<AnimateInput
						inputName='email'
						inputText='Эл.почта/номер тел.'
						inputType='text'
						inputState={setEmail}
					/>
				</div>
				<div className={styles.inputWrapper}>
					<AnimateInput
						inputName='name'
						inputText='Имя'
						inputType='text'
						inputState={setName}
					/>
				</div>
				<div className={styles.inputWrapper}>
					<AnimateInput
						inputName='password'
						inputText='Пароль'
						inputType='password'
						inputState={setPassword}
					/>
				</div>
				<div className={styles.inputWrapper}>
					<AnimateInput
						inputName='password_confirmation'
						inputText='Подтвердить пароль'
						inputType='password'
						inputState={setPasswordConfirmation}
					/>
				</div>
				<Button
					text='Зарегистрироваться'
					isSubmit={true}
					click={handleSignup}
				/>
			</form>
		</div>
	);
};

export function Forms() {
	const [isLoginPage, setLoginPage] = useState(true);

	return (
		<section className={styles.auth}>
			<Login isActive={isLoginPage} />
			<Signup isActive={!isLoginPage} />
			<div
				className={`${styles.decorationBlock} ${isLoginPage ? '' : styles.decorationBlockActive}`}
			>
				<div className={styles.wrapperContent}>
					<div
						className={`${styles.loginContent} ${isLoginPage ? '' : styles.activeDecorationContent} ${isLoginPage ? styles.activeContent : ''}`}
					>
						<div className={styles.wrapperLogo}>
							<Image
								src='/logo.svg'
								alt='logo'
								width={65}
								height={26}
							/>
						</div>
						<div className={styles.itemWrapper}>
							<h2>С возвращением!</h2>
							<p>Силикс - погрузитесь в мир общения, обмена идеями и кодом среди программистов!</p>
						</div>
						<div className={styles.itemWrapper}>
							<p>Нет аккаунта? -</p>
							<Button
								text='Зарегистрироваться'
								click={() => setLoginPage(!isLoginPage)}
							/>
						</div>
					</div>
					<div
						className={`${styles.signupContent} ${isLoginPage ? '' : styles.activeDecorationContent} ${isLoginPage ? '' : styles.activeContent}`}
					>
						<div className={styles.wrapperLogo}>
							<Image
								src='/logo.svg'
								alt='logo'
								width={65}
								height={26}
							/>
						</div>
						<div className={styles.itemWrapper}>
							<h2>Добро пожаловать!</h2>
							<p>Силикс - погрузитесь в мир общения, обмена идеями и кодом среди программистов!</p>
						</div>
						<div className={styles.itemWrapper}>
							<p>Есть аккаунта? -</p>
							<Button
								text='Войти'
								click={() => setLoginPage(!isLoginPage)}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
