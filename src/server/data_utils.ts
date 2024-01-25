import { and, eq } from 'drizzle-orm';
import { db } from '../hooks.server';
import { checks, habits } from '../schema';

// Save Habits new order after a reorder sequence
export async function update_habits_order(users_habits: string[] | number[], user_id: number) {
	for (const [index, habit_id] of users_habits.entries()) {
		console.log('index', index, habit_id);
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
	data: typeof habits.$inferSelect & { checks: (typeof checks.$inferSelect)[] }[],
): TransformedHabits[] {
	return data.map((item) => ({
		...item,
		checks: item.checks.map((check) => check.checked_at),
	}));
}

export type TransformedHabits = {
	id: number;
	status: 'VISIBLE' | 'HIDDEN' | 'ARCHIVED';
	checks: string[];
	days_per_month: number | null;
	name: string | null;
};
