import type { Handle } from '@sveltejs/kit';
import * as schema from './schema';
import { sequence } from '@sveltejs/kit/hooks';
import { form_data } from 'sk-form-data';
import { DATABASE_URL } from '$env/static/private';
import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

neonConfig.fetchConnectionCache = true;

const sql = neon(DATABASE_URL);
export const db = drizzle(sql, { schema });

export const auth: Handle = async ({ event, resolve }) => {
	const cookie_string = event.request.headers.get('cookie') ?? '';
	const cookies = parse_cookies(cookie_string);
	console.log('cookies', cookies);
	const response = await resolve(event);
	return response;
};

export const handle: Handle = sequence(form_data);

export const parse_cookies = (cookie_string: string) => {
	if (cookie_string)
		return cookie_string
			.split(';')
			.map((v) => v.split('='))
			.reduce((acc: any, v) => {
				acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
				return acc;
			}, {});
};
