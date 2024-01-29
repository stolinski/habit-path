import { and, eq } from 'drizzle-orm';
import { db } from '../../../hooks.server';
import { habits } from '../../../schema';

export const load = async ({ locals, params }) => {
	const data = await db.query.habits.findFirst({
		where: and(eq(habits.user_id, locals?.user?.id), eq(habits.id, parseInt(params.habit_id))),
	});

	return {
		habit: data,
	};
};
