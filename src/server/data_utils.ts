import { format, getDaysInMonth } from 'date-fns';
import { and, eq } from 'drizzle-orm';
import { db } from '../hooks.server';
import { checks, habits } from '../schema';

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

// Transforms habits out of the db to returning just an array full of dates
export function transform_habits(
	inputData: typeof habits.$inferSelect & { checks: (typeof checks.$inferSelect)[] }[],
	active_date: string,
): TransformedHabits[] {
	const days_in_month = getDaysInMonth(new Date(active_date));
	const days_in_month_array = [...Array(days_in_month)];

	return inputData.map((item) => ({
		...item,
		checks: days_in_month_array.map((day, i) => {
			const check_day = new Date(active_date).setDate(i + 1);
			return {
				checked_at: format(check_day, 'yyyy-MM-dd'),
				is_checked: isDateChecked(item.checks, format(check_day, 'yyyy-MM-dd')),
			};
		}),
	}));
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
