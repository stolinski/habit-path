import { and, eq } from 'drizzle-orm';
import { db } from '../../../hooks.server';
import { habits } from '../../../schema';

export const load = async ({ locals, params }) => {
	const data = await db.query.habits.findFirst({
		where: and(eq(habits.user_id, locals?.user?.id), eq(habits.id, parseInt(params.habit_id))),
		with: {
			checks: true,
		},
	});

	return {
		habit: transformData(data),
	};
};

function transformData({ checks, ...rest }) {
	// Destructure the input to get the name and checks array
	// Map over the checks array to transform each checkedAt date
	const transformedChecks = checks.map((check) => {
		// Return the transformed check object
		return check.checked_at;
	});

	// Return the transformed data
	return { ...rest, checks: transformedChecks };
}
