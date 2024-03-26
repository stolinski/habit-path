import { normalizeEmail } from '$lib/server/auth';
import { send_reset_password_email } from '$lib/server/email';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$src/hooks.server';
import { user } from '$src/schema';

export const load = async function ({ locals }) {
	if (locals.user?.id) return redirect(302, '/');
	return {};
};

export const actions = {
	async default({ locals }) {
		const { email } = locals.form_data as { email: string };
		const local_email = normalizeEmail(email);
		const local_user = await db.query.user.findFirst({ where: eq(user.email, local_email) });
		if (!local_user) {
			return fail(401, {
				message: 'Invalid email',
			});
		}

		await send_reset_password_email(email);
		return {
			success: true,
		};
	},
};
