import { fail, redirect } from '@sveltejs/kit';
import { isValidEmail } from '$lib/server/email';

import type { PageServerLoad, Actions } from './$types';
import { bcryptPassword, getPasswordString, log_user_in, normalizeEmail } from '$lib/server/auth';
import { user } from '../../schema';
import { db } from '../../hooks.server';

export const load: PageServerLoad = async ({ locals }) => {
	// const session = await locals.auth.validate();
	// if (session) {
	// 	if (!session.user.emailVerified) throw redirect(302, '/email-verification');
	// 	throw redirect(302, '/');
	// }
	// return {};
};

export const actions: Actions = {
	default: async ({ locals, cookies }) => {
		const { email, password } = locals.form_data;
		// basic check
		const normalized_email = normalizeEmail(email as string);
		if (!isValidEmail(normalized_email)) {
			return fail(400, {
				message: 'Invalid email'
			});
		}
		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Invalid password'
			});
		}
		try {
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
					hashed_password: passwordBcrypt
				})
				.returning();

			// If user exists, LOG USER IN
			await log_user_in({ user_id: logged_in_user[0].id, cookies });
		} catch (e) {
			console.error('e', e);
			// check for unique constraint error in user table
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		// redirect to
		// make sure you don't throw inside a try/catch block!
		throw redirect(302, '/');
	}
};
