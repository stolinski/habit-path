import { and, eq } from 'drizzle-orm';
import { db } from '../hooks.server';
import { checks, habits } from '$src/schema';

// Save Habits new order after a reorder sequence
export async function update_habits_order(users_habits: string[] | number[], user_id: number) {
	for (const [index, habit_id] of users_habits.entries()) {
		const new_order = index * 10;
		let int_habit_id: number;

		// handle string conversion if needed
		if (typeof habit_id === 'string') {
			int_habit_id = parseInt(habit_id);
		} else {
			int_habit_id = habit_id;
		}
		await db
			.update(habits)
			.set({
				updated_at: new Date(),
				order: new_order,
			})
			.where(and(eq(habits.id, int_habit_id), eq(habits.user_id, user_id)));
	}
}

export function get_days_in_month(iso: string) {
	const date = Temporal.PlainDate.from(iso);
	const nextMonth = date.add({ months: 1 });
	const startOfNextMonth = nextMonth.with({ day: 1 });
	const lastDayOfThisMonth = startOfNextMonth.subtract({ days: 1 });
	return lastDayOfThisMonth.day;
}

// Transforms habits out of the db to returning just an array full of dates
export function transform_habits(
	inputData: typeof habits.$inferSelect & { checks: (typeof checks.$inferSelect)[] }[],
	active_date: string,
): TransformedHabits[] {
	const days_in_month = get_days_in_month(active_date);
	const days_in_month_array = [...Array(days_in_month)];

	return inputData.map(
		(item: typeof habits.$inferSelect & { checks: (typeof checks.$inferSelect)[] }) => ({
			...item,
			checks: days_in_month_array.map((_, i) => {
				const temp_date = Temporal.PlainDate.from(active_date);
				const check_day = temp_date.add({ days: i });

				return {
					checked_at: check_day.toString(),
					is_checked: isDateChecked(item.checks, check_day.toString()),
				};
			}),
		}),
	);
}

type Checks = {
	id: number;
	user_id: number;
	checked_at: string;
};

function isDateChecked(checksArray: Checks[], dateToCheck: string) {
	return checksArray.some((check: Checks) => {
		return check.checked_at === dateToCheck;
	});
}

export type TransformedHabits = {
	id: number;
	status: 'VISIBLE' | 'HIDDEN' | 'ARCHIVED';
	checks: { checked_at: string; is_checked: boolean }[];
	days_per_month: number | null;
	name: string | null;
};
