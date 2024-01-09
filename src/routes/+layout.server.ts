export const load = async ({ locals, url }) => {
	return {
		user: locals.user,
		url: url.pathname,
	};
};
