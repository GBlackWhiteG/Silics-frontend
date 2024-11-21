import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

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
