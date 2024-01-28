import { cookie_options } from '$lib/const';
import type { Cookies } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import crypto, { randomBytes } from 'crypto';
import { eq } from 'drizzle-orm';
import { db } from '../../hooks.server';
import { user as schema_user, session } from '../../schema';
import { createTokens } from './jwt';
import {
	find_by_session_token,
	get_session_token_from_refresh_token,
	resume_session,
} from './sess';

const { compare, genSalt, hash } = bcrypt;

export async function authenticate_user(cookies: Cookies) {
	let user = null;
	let access_token = cookies.get('accessToken') ?? null;
	let refresh_token = cookies.get('refreshToken') ?? null;

	// 1. If cookies exist attempt to find user
	if (access_token || refresh_token) {
		// Access Token is the most important token.
		// If you have an access token, you are good.
		if (access_token) {
			// resume user session
			user = await resume_session(access_token);
		} else if (refresh_token) {
			//  Get session token from refresh token
			const session_token = get_session_token_from_refresh_token(refresh_token);
			// If session token exists
			if (session_token) {
				// Find session by token
				const session = await find_by_session_token(session_token);
				//  If session exists, find user
				if (session) {
					const user = await db.query.user.findFirst({
						where: eq(schema_user.id, session.user_id),
						columns: {
							id: true,
							email: true,
							verified: true,
						},
					});
					if (user) {
						// Create a new access token and resume session
						const tokens = createTokens({
							token: session_token,
							user_id: user.id,
						});
						access_token = tokens.accessToken;
						refresh_token = tokens.refreshToken;
					}
				}
			}
		}
	}
	return {
		user,
		access_token,
		refresh_token,
	};
}

// Given a 'password' from the client, extract the string that we should
// bcrypt. 'password' can be one of:
//  - String (the plaintext password)
//  - Object with 'digest' and 'algorithm' keys. 'algorithm' must be "sha-256".
export const getPasswordString = (password: string): string => {
	const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
	return passwordHash;
};

export const bcryptPassword = async (password: string): Promise<string> => {
	const salt = await genSalt(10);
	const hashedPassword = await hash(password, salt);
	return hashedPassword;
};

export const normalizeEmail = (email: string): string => {
	return decodeURIComponent(email).toLowerCase().trim();
};

// Compares password to hash to confirm they are the same
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
	const compared: boolean = await compare(password, hash);
	return compared;
}

// Generates random string of bites
export const generateRandomToken = (length = 43): string => randomBytes(length).toString('hex');

// Creates a session token & a valid Session
// Creates access and refresh token
export async function log_user_in({ user_id, cookies }: { user_id: number; cookies: Cookies }) {
	// Create Session Token
	const session_token = createSessionToken();
	// Creates a session in the database
	const session_data = await db
		.insert(session)
		.values({
			user_id,
			session_token,
		})
		.returning();

	// Create access and refresh tokens
	// These tokens contain the session token as well as the
	// accessToken has the userId
	const { accessToken, refreshToken } = createTokens({
		token: session_token,
		user_id,
	});

	// Sets cookies for the response in the browser
	setAuthCookies({ accessToken, refreshToken, cookies });

	return {
		sessionId: session_data[0].id,
		tokens: {
			refreshToken,
			accessToken,
		},
		user_id,
	};
}

export function setAuthCookies({
	accessToken,
	refreshToken,
	cookies,
}: {
	accessToken: string;
	refreshToken: string;
	cookies: Cookies;
}) {
	cookies.set('accessToken', accessToken, cookie_options);
	cookies.set('refreshToken', refreshToken, cookie_options);
}
// Generates a token to be saved to the database to identify a session
export function createSessionToken() {
	return generateRandomToken();
}

export async function login_with_password(password: string, email: string) {
	// Finds user by email
	const user = await db.query.user.findFirst({
		where: eq(schema_user.email, email),
	});
	if (user) {
		// Compares password hash to one in database
		const compared: boolean = await authenticate_user_password(password, user?.hashed_password);
		if (compared) {
			return user;
		}
	}
}

// Takes a user and a pw string and gives you a boolean if
// the password matches the one in the database
export async function authenticate_user_password(
	password: string,
	user_pw: string,
): Promise<boolean> {
	// Gets password hash from plain text password
	const formattedPassword = getPasswordString(password);

	if (!user_pw) return false;
	if (user_pw) {
		// Compares password hash to one in database
		const compared: boolean = await verifyPassword(formattedPassword, user_pw);

		if (compared) {
			// Returns boolean if the user password is accurate
			return compared;
		}
	}
	return false;
}
