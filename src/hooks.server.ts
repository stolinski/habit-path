import { DATABASE_URL } from '$env/static/private';
import { cookie_options } from '$lib/const';
import { authenticate_user } from '$lib/server/auth';
import { Pool, neon, neonConfig } from '@neondatabase/serverless';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { drizzle } from 'drizzle-orm/neon-http';
import { form_data } from 'sk-form-data';
import * as schema from './schema';

neonConfig.fetchConnectionCache = true;

export const pool = new Pool({ connectionString: DATABASE_URL });
export const sql = neon(DATABASE_URL);
export const db = drizzle(sql, { schema });

export const authentication: Handle = async ({ event, resolve }) => {
	const { cookies } = event;
	const { user, access_token, refresh_token } = await authenticate_user(cookies);

	// TODO This is getting redic. Refactor
	if (
		!user &&
		event.url.pathname !== '/login' &&
		event.url.pathname !== '/signup' &&
		event.url.pathname !== '/roadmap' &&
		event.url.pathname !== '/forgot-password' &&
		event.url.pathname !== '/set-password' &&
		event.url.pathname !== '/pwa' &&
		event.url.pathname !== '/waitlist'
	) {
		redirect(307, '/waitlist');
	}
	event.locals.user = user;
	event.locals.theme = decodeURIComponent(cookies.get('theme') || 'system');
	event.locals.button_theme = decodeURIComponent(cookies.get('button_theme') || 'path');

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
