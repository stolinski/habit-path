import { eq } from 'drizzle-orm';
import { db } from '$src/hooks.server';
import { user } from '$src/schema';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const token = params.token;

	if (!token) {
		return {
			status: 400,
			body: 'Missing verification token',
		};
	}

	// Check if the verification token exists in the database
	const found_user = await db
		.select()
		.from(user)
		.where(eq(user.verification_token, token))
		.execute();

	if (found_user.length > 0) {
		// Update the user's verification status
		await db
			.update(user)
			.set({ verified: true, verification_token: null })
			.where(eq(user.id, found_user[0].id))
			.execute();

		throw redirect(302, '/');
	} else {
		return fail(400, {
			message: 'Invalid verification token',
		});
	}
};
