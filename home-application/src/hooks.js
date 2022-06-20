import * as cookie from 'cookie';
import { prisma } from '$lib/db';
export const handle = async({event,resolve}) => {
    const cookieHeader = event.request.headers.get('cookie')
    const cookies = cookie.parse(cookieHeader ?? '');
    console.log(cookies);
    return await resolve(event);
}