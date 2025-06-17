import type { Metadata } from 'next';

import { Forms } from './auth.data';
import '@/app/globals.css';

export const metadata: Metadata = {
	title: 'Авторизация',
};

export default function Auth() {
	return <Forms />;
}
