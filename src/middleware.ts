import { type NextRequest, NextResponse } from 'next/server';

import { publicPage } from './config/public-page.config';
import { EnumTokens } from './enums/auth.enums';

export async function middleware(request: NextRequest) {
	const token = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value;

	if (
		request.nextUrl.pathname === publicPage.CODE ||
		request.nextUrl.pathname === `${publicPage.PROFILE}/undefined` ||
		request.nextUrl.pathname === publicPage.SETTINGS ||
		request.nextUrl.pathname === publicPage.FRIENDS
	) {
		if (!token) {
			return NextResponse.redirect(new URL(publicPage.AUTH, request.url));
		}
	}

	if (request.nextUrl.pathname === publicPage.AUTH) {
		if (token) {
			return NextResponse.redirect(new URL('/', request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/',
		publicPage.PROFILE,
		publicPage.CODE,
		publicPage.SETTINGS,
		publicPage.FRIENDS,
		publicPage.AUTH,
	],
};
