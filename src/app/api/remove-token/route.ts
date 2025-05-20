import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

import { EnumTokens } from '@/enums/auth.enums';

export async function POST(req: NextRequest) {
	const cookieStore = await cookies();
	cookieStore.delete(EnumTokens.ACCESS_TOKEN);
}
