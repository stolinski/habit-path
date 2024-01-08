export const load = async ({ locals, url }) => {
	console.log('url', url);
	return {
		user: locals.user,
		url: url.pathname,
	};
};
