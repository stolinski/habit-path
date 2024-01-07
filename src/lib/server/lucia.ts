import { lucia } from 'lucia';
import { pool } from '../../hooks.server';
import { pg } from '@lucia-auth/adapter-postgresql';

export const auth = lucia({
	env: 'DEV',
	adapter: pg(pool, {
		user: 'auth_user',
		key: 'auth_key',
		session: 'auth_session'
	})
});

export type Auth = typeof auth;
