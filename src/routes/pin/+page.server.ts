import { cookie_options } from '$lib/const.js';

export const actions = {
	async default({ locals, cookies }) {
		const { pin } = locals.form_data;
		cookies.set('PIN', pin, cookie_options);
	}
};
