import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { bcryptPassword, getPasswordString, log_user_in, login_with_password, normalizeEmail } from '$lib/server/auth';
import { db } from '../../hooks.server';
import { user } from '../../schema';
import { eq } from 'drizzle-orm';
import { check_is_password_valid } from '$lib/utils';

export const load = async function ({ locals }) {
	locals.user;
};

export const actions: Actions = {
	default: async ({ locals, cookies }) => {
		if (!locals.user) {
			throw redirect(302, '/');
		}

		const { old_password, new_password, confirm_password } = locals.form_data;

		if (old_password === new_password) {
			return fail(400, {
				message: 'New password cannot be the same as the old password',
			});
		}

		// basic check
		if (!check_is_password_valid(new_password)) {
			return fail(400, {
				message: 'New password does not meet requirements',
			});
		}

		if (new_password !== confirm_password) {
			return fail(400, {
				message: 'Passwords do not match',
			});
		}

		const successful_login = await login_with_password(old_password, locals.user?.email ?? '' as string);

		if (!successful_login) {
			return fail(400, {
				message: 'Old password is incorrect',
			});
		}

		try {
			// Hash password
			const passwordHash: string = getPasswordString(new_password);

			// Salts the hashed password before saving to the db
			// Salt Password
			const passwordBcrypt: string = await bcryptPassword(passwordHash);

			// Create new user
			const logged_in_user = await db
				.update(user)
				.set({
					hashed_password: passwordBcrypt,
				})
				.where(eq(user.id, locals.user?.id ?? 0))
				.returning();

			// Update the user's session
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
