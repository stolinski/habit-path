import { PIN, RESEND_TOKEN } from '$env/static/private';
import { eq } from 'drizzle-orm';
import { Resend } from 'resend';
import { db } from '../../hooks.server';
import { waitlist } from '../../schema';

const resend = new Resend(RESEND_TOKEN);

export const isValidEmail = (maybeEmail: unknown): maybeEmail is string => {
	if (typeof maybeEmail !== 'string') return false;
	if (maybeEmail.length > 255) return false;
	const emailRegexp = /^.+@.+$/; // [one or more character]@[one or more character]
	return emailRegexp.test(maybeEmail);
};

export async function send_waitlist_invite(email: string) {
	// Send email with code
	resend.emails.send({
		from: 'no-reply@habitpath.io',
		to: email,
		subject: 'Track your habits now with Habit Path - Habit Path Invite',
		html: `<p>
		Welcome to Habit Path, you can now sign up here: <a href="https://habitpath.io/signup">Habit Path Signup</a>
		</p>
		<p>You'll need this code: ${PIN}</p>
		<p>Before asking for a feature, please check out <a href="https://habitpath.io/roadmap">Habit Path Roadmap</a> for information on what's changed and what's coming.</p>
		<p>Thank you, I hope you make positive change with Habit Path.</a>
		`,
	});

	// Update waitlist user sent property
	await db.update(waitlist).set({ invited: true }).where(eq(waitlist.email, email));
}
