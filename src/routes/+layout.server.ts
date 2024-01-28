export const load = async ({ locals, url }) => {
	const params_date = url.searchParams.get('date');
	return {
		user: locals.user,
		url: url.pathname,
		active_date: params_date ? new Date(params_date) : new Date(),
		user_theme: locals.theme,
		user_button_theme: locals.button_theme,
	};
};
