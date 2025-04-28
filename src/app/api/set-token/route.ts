import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import { EnumTokens } from '@/enums/auth.enums';

export async function POST(req: NextRequest) {
	const { token } = await req.json();

	if (!token) {
		return NextResponse.json({ message: 'Не передан токен' }, { status: 400 });
	}

	const cookieStore = await cookies();
	cookieStore.set(EnumTokens.ACCESS_TOKEN, token, {
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
		maxAge: 60 * 60,
		path: '/',
	});

	return NextResponse.json({ message: 'Токен успешно установлен' });
}
