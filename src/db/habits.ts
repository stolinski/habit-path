import { asc, between, eq } from 'drizzle-orm';
import { transform_habits } from '../server/data_utils';
import { checks, habits } from '../schema';
import { get_param_date } from '$lib/utils';
import { db } from '../hooks.server';

export async function get_habits(date: Temporal.PlainDate, user_id: number) {
	const firstDayOfMonth = get_param_date(date.with({ day: 1 }));
	const endOfMonth = date.with({ day: 1 }).add({ months: 1 }).subtract({ days: 1 });
	const lastDayOfMonth = get_param_date(endOfMonth);

	//  Add check for proper month between.
	const habits_data = await db.query.habits.findMany({
		where: eq(habits.user_id, user_id),
		orderBy: [asc(habits.order)],
		with: {
			checks: {
				where: between(checks.checked_at, firstDayOfMonth, lastDayOfMonth),
			},
		},
	});
	return transform_habits(habits_data, firstDayOfMonth.toString());
}
