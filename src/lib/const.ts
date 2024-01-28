import { PUBLIC_DOMAIN } from '$env/static/public';

export const cookie_options =
	PUBLIC_DOMAIN !== 'localhost'
		? ({
				httpOnly: true,
				path: '/',
				secure: true,
				domain: PUBLIC_DOMAIN,
				sameSite: 'lax',
				maxAge: 60 * 60 * 24 * 365, // 1 year
			} as const)
		: ({
				httpOnly: true,
				path: '/',
				sameSite: 'lax',
				maxAge: 60 * 60 * 24 * 365, // 1 year
			} as const);

export const COLORS = [
	'var(--button_1)',
	'var(--button_2)',
	'var(--button_3)',
	'var(--button_4)',
	'var(--button_5)',
	'var(--button_6)',
];
export const DARK_COLORS = ['var(--button_6)'];
