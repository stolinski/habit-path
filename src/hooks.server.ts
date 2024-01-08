import type { Handle } from '@sveltejs/kit';
import * as schema from './schema';
import { sequence } from '@sveltejs/kit/hooks';
import { form_data } from 'sk-form-data';
import { DATABASE_URL } from '$env/static/private';
import { Pool, neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { authenticate_user } from '$lib/server/auth';
import { cookie_options } from '$lib/const';

neonConfig.fetchConnectionCache = true;

export const pool = new Pool({ connectionString: DATABASE_URL });
export const sql = neon(DATABASE_URL);
export const db = drizzle(sql, { schema });

export const authentication: Handle = async ({ event, resolve }) => {
	const { cookies } = event;
	const { user, access_token, refresh_token } = await authenticate_user(cookies);
	event.locals.user = user;

	if (access_token) cookies.set('accessToken', access_token, cookie_options);
	if (refresh_token) cookies.set('refreshToken', refresh_token, cookie_options);

	const response = await resolve(event);
	return response;
};

export const handle: Handle = sequence(form_data, authentication);

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
