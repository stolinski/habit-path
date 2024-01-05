export const actions = {
	async default({ locals, cookies }) {
		const { pin } = locals.form_data;

		cookies.set('PIN', pin, {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 365 // 1 year
		});
	}
};
