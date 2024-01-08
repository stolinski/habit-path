import { fail, redirect } from '@sveltejs/kit';
import { isValidEmail } from '$lib/server/email';

import type { PageServerLoad, Actions } from './$types';
import { login_with_password, log_user_in, normalizeEmail } from '$lib/server/auth';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/');
	}
	return {};
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
		const user = await login_with_password(password, normalized_email);
		if (user) {
			await log_user_in({ user_id: user.id, cookies });
			throw redirect(302, '/');
		}
	}
};
