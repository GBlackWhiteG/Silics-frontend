import { type NextRequest, NextResponse } from 'next/server';

import { EnumTokens } from './enums/auth.enums';

export async function middleware(request: NextRequest) {
	const token = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value;

	if (request.nextUrl.pathname === '/news') {
		if (!token) {
			return NextResponse.redirect(new URL('/', request.url));
		}
	}

	if (request.nextUrl.pathname === '/') {
		if (token) {
			return NextResponse.redirect(new URL('/news', request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/', '/news'],
};
