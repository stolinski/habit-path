import { fail, redirect } from '@sveltejs/kit';
import { isValidEmail } from '$lib/server/email';
import { PIN } from '$env/static/private';
import { eq } from 'drizzle-orm';

import type { PageServerLoad, Actions } from './$types';
import { bcryptPassword, getPasswordString, log_user_in, normalizeEmail } from '$lib/server/auth';
import { user } from '../../schema';
import { db } from '../../hooks.server';
import { PIN } from '$env/static/private';
import { check_is_password_valid } from '$lib/utils';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ locals, cookies }) => {
		const { email, password, code } = locals.form_data;

		if (code !== PIN) {
			return fail(400, {
				message: 'Invalid Code',
			});
		}
		// basic check
		const normalized_email = normalizeEmail(email as string);
		if (!isValidEmail(normalized_email)) {
			return fail(400, {
				message: 'Invalid email',
			});
		}
		if (!check_is_password_valid(password)) {
			return fail(400, {
				message: 'Invalid password',
			});
		}
		try {
			// Check if user exists
			const user_exists = await db
				.query
				.user
				.findFirst({ where: eq(user.email, normalized_email) });

			if (user_exists) {
				return fail(400, {
					message: 'User already exists',
				});
			}

			// Hash password
			const passwordHash: string = getPasswordString(password);

			// Salts the hashed password before saving to the db
			// Salt Password
			const passwordBcrypt: string = await bcryptPassword(passwordHash);

			// Create new user
			const logged_in_user = await db
				.insert(user)
				.values({
					email: normalized_email,
					hashed_password: passwordBcrypt,
				})
				.returning();

			// If user exists, LOG USER IN
			await log_user_in({ user_id: logged_in_user[0].id, cookies });
		} catch (e) {
			console.error('e', e);
			// check for unique constraint error in user table
			return fail(500, {
				message: 'An unknown error occurred',
			});
		}
		// redirect to
		// make sure you don't throw inside a try/catch block!
		throw redirect(302, '/');
	},
};
