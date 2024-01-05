import { eq } from 'drizzle-orm';
import { db } from '../hooks.server';
import { checks, habits } from '../schema';
import { createUTCDate } from '$lib/utils';

export const load = async () => {
	const data = await db.query.habits.findMany({
		with: {
			checks: true
		}
	});

	return {
		habits: transformData(data)
	};
};

export const actions = {
	async new_habit({ locals }) {
		const { name, days_per_month } = locals.form_data;
		await db.insert(habits).values({
			name,
			days_per_month: parseInt(days_per_month)
		});
	},
	async add_check({ locals }) {
		const { habit_id, checked_at } = locals.form_data as {
			habit_id: string;
			checked_at: string;
		};
		console.log('habit_id', habit_id);
		const time = createUTCDate(parseInt(checked_at)).toDateString();

		await db.insert(checks).values({
			habit_id: parseInt(habit_id),
			checked_at: time
		});
	},
	async remove_check({ locals }) {
		const { check_id } = locals.form_data;
		await db.delete(checks).where(eq(checks.id, check_id));
	},
	async hide_habit({ locals }) {
		const { habit_id } = locals.form_data as number;
		const edit_habit = await db.query.habits.findFirst({
			where: (habits, { eq }) => eq(habits.id, habit_id)
		});
		if (edit_habit)
			await db.update(habits).set({ visible: !edit_habit.visible }).where(eq(habits.id, habit_id));
	}
};

function transformData(input) {
	return input.map(({ checks, ...rest }) => {
		// Destructure the input to get the name and checks array

		// Map over the checks array to transform each checkedAt date
		const transformedChecks = checks.map((check) => {
			// Ensure that the checkedAt is a valid Date object
			const date = createUTCDate(check.checked_at);

			// Format the date as MM-DD-YY
			const formattedDate = [
				String(date.getUTCMonth() + 1).padStart(2, '0'), // Months are 0-based in JS
				String(date.getUTCDate()).padStart(2, '0'),
				String(date.getUTCFullYear()).slice(-2) // Get the last two digits of the year
			].join('-');

			// Return the transformed check object
			return formattedDate;
		});

		// Return the transformed data
		return { ...rest, checks: transformedChecks };
	});
}
