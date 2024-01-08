import { eq } from 'drizzle-orm';
import { db } from '../hooks.server';
import { checks, habits } from '../schema';

export const load = async ({ locals }) => {
	const data = await db.query.habits.findMany({
		where: eq(habits.user_id, parseInt(locals.user.id)),
		with: {
			checks: true,
		},
	});

	return {
		habits: transformData(data),
	};
};

export const actions = {
	async new_habit({ locals }) {
		const { name, days_per_month } = locals.form_data as {
			name: string;
			days_per_month: string;
		};

		if (locals.user.id) {
			await db.insert(habits).values({
				user_id: locals.user.id,
				name,
				days_per_month: parseInt(days_per_month),
			});
		}
	},

	async add_check({ locals }) {
		const { habit_id, checked_at } = locals.form_data as {
			habit_id: string;
			checked_at: string;
		};
		if (locals.user.id) {
			await db.insert(checks).values({
				user_id: locals.user.id,
				habit_id: parseInt(habit_id),
				checked_at,
			});
		}
	},

	async remove_check({ locals }) {
		const { check_id } = locals.form_data;
		await db.delete(checks).where(eq(checks.id, check_id));
	},
	async hide_habit({ locals }) {
		const { habit_id } = locals.form_data;
		const edit_habit = await db.query.habits.findFirst({
			where: (habits, { eq }) => eq(habits.id, habit_id),
		});
		if (edit_habit)
			await db.update(habits).set({ visible: !edit_habit.visible }).where(eq(habits.id, habit_id));
	},
};

function transformData(input) {
	return input.map(({ checks, ...rest }) => {
		// Destructure the input to get the name and checks array
		// Map over the checks array to transform each checkedAt date
		const transformedChecks = checks.map((check) => {
			// Return the transformed check object
			return check.checked_at;
		});

		// Return the transformed data
		return { ...rest, checks: transformedChecks };
	});
}
