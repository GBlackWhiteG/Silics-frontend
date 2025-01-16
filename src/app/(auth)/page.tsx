import type { Metadata } from 'next';

import { Forms } from './auth.data';

export const metadata: Metadata = {
	title: 'Авторизация',
};

export default function Auth() {
	return <Forms />;
}
