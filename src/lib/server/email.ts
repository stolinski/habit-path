import { PIN, RESEND_TOKEN, TOKEN_SECRET } from '$env/static/private';
import crypto from 'crypto';
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

const createExpiringAuthDigest = (email: string, expirationTimestamp: number) => {
	const authString = `${TOKEN_SECRET}:${email}:${expirationTimestamp}`;
	return crypto.createHash('sha256').update(authString).digest('hex');
};

export function create_password_link(email: string): string {
	const expirationTimestamp = Date.now() + 1000 * 60 * 60 * 24;
	const authDigest = createExpiringAuthDigest(email, expirationTimestamp);
	const URIEncodedEmail = encodeURIComponent(email);
	return `https://habitpath.io/set-password?email=${URIEncodedEmail}&key=${authDigest}&expire=${expirationTimestamp}`;
}

export async function send_reset_password_email(email: string) {
	const set_password_url = create_password_link(email);
	// Send email with code
	resend.emails.send({
		from: 'no-reply@habitpath.io',
		to: email,
		subject: 'Habit Path Reset Email',
		html: `<p>
		A request was made on Habit Path to reset your password.
		</p>
		<p>To set your password, please click the set password link below.
          If you did not make this request to reset your password, 
          please contact our support team and we will assist to 
          ensure that your account is kept secure.</p>
		<p> <a href="${set_password_url}">Reset Password</a></p>
		`,
	});
}
