'use client';

import type { Axios, AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/buttons';

import { publicPage } from '@/config/public-page.config';

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
			const response = await toast.promise(authServices.login({ email, password }), {
				loading: 'Пожалуйста подождите',
				success: 'Успешно',
				error: 'Неправильный логин или пароль',
			});
			if (response.status === 200) {
				if (response.data.token !== undefined) {
					authServices.saveTokenStorage(response.data.token);
					router.push(publicPage.NEWS);
				} else {
					router.push(publicPage.EMAIL_2FA);
				}
			}
		} catch {
			toast.error('Неправильный логин или пароль');
		}
	};

	return (
		<div className={`${styles.login} ${isActive ? styles.activeForm : ''}`}>
			<h2>Вход</h2>
			<form className={styles.loginForm}>
				<AnimateInput
					inputText='Эл.почта/номер тел.'
					name='email'
					type='text'
					inputState={setEmail}
				/>
				<AnimateInput
					inputText='Пароль'
					name='password'
					type='password'
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

	const router = useRouter();

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await toast.promise(
				authServices.register({
					email,
					name,
					password,
					password_confirmation: passwordConfirmation,
				}),
				{
					loading: 'Пожалуйста подождите',
					success: 'Успешно',
				},
			);

			if (response.status === 200) {
				router.push(publicPage.NOT_VERIFIED_EMAIL);
			}
		} catch (error: AxiosError | any) {
			const errors = JSON.parse(error.response.data);
			Object.keys(errors).forEach((key: string) => {
				toast.error(errors[key][0]);
			});
		}
	};

	return (
		<div className={`${styles.signup} ${isActive ? styles.activeForm : ''}`}>
			<h2>Регистрация</h2>
			<form className={styles.signupForm}>
				<div className={styles.inputWrapper}>
					<AnimateInput
						inputText='Эл.почта/номер тел.'
						name='email'
						type='text'
						inputState={setEmail}
					/>
				</div>
				<div className={styles.inputWrapper}>
					<AnimateInput
						inputText='Имя'
						name='name'
						type='text'
						inputState={setName}
					/>
				</div>
				<div className={styles.inputWrapper}>
					<AnimateInput
						inputText='Пароль'
						name='password'
						type='password'
						inputState={setPassword}
					/>
				</div>
				<div className={styles.inputWrapper}>
					<AnimateInput
						inputText='Подтвердить пароль'
						name='password_confirmation'
						type='password'
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
