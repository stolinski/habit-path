import { fail } from '@sveltejs/kit';
import { db } from '../../hooks.server';
import { waitlist } from '../../schema';
import { normalizeEmail } from '$lib/server/auth';
import { isValidEmail } from '$lib/server/email';

export const actions = {
	async default({ locals }) {
		const { email } = locals.form_data as {
			email: string;
		};

		const normalized_email = normalizeEmail(email as string);
		if (!isValidEmail(normalized_email)) {
			return fail(400, {
				message: "Could you try again, looks like you didn't enter a valid address. Thanks!",
			});
		}
		try {
			await db.insert(waitlist).values({
				email,
			});
			return {
				success: true,
			};
		} catch (e) {
			return fail(500, {
				message: 'An unknown error occurred',
			});
		}
	},
};
