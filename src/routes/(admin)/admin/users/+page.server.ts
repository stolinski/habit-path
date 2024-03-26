import { send_waitlist_invite } from '$lib/server/email';
import { redirect } from '@sveltejs/kit';
import { notInArray } from 'drizzle-orm';
import { db } from '$src/hooks.server';
import { waitlist } from '$src/schema';

export const load = async function ({ locals }) {
	if (locals.user.id !== 1) return redirect(302, '/');
	const all_users = await db.query.user.findMany();
	const user_emails = all_users.map((user) => user.email) as string[];
	return {
		waitlist: await db.query.waitlist.findMany({
			where: notInArray(waitlist.email, user_emails),
		}),
		users: all_users,
	};
};

export const actions = {
	async default({ locals }) {
		const { email } = locals.form_data;
		if (email) await send_waitlist_invite(email as string);
		return true;
	},
};
