import { PIN } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies, url }) => {
	console.log('cookies', cookies.getAll());
	if (PIN === cookies.get('PIN')) return {};

	if (url.pathname !== '/pin') redirect(307, '/pin');
	return {};
};
