import { and, eq } from 'drizzle-orm';
import { db } from '../hooks.server';
import { checks, habits } from '../schema';

export const load = async ({ locals }) => {
	// let date_tree =
	// TODO function that builds date
	// Building blocks for how I want to query moving forward
	// try {
	// 	const test = await db.query.habits.findMany({
	// 		where: eq(habits.user_id, locals?.user?.id),
	// 		with: {
	// 			checks: {
	// 				where: between(checks.checked_at, '2024-01-01', '2024-01-31'),
	// 			},
	// 		},
	// 	});
	// } catch (e) {
	// 	console.log('e', e);
	// }
	const data = await db.query.habits.findMany({
		where: eq(habits.user_id, locals?.user?.id),
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

		if (locals?.user?.id) {
			await db.insert(habits).values({
				user_id: locals.user.id,
				name,
				days_per_month: parseInt(days_per_month),
			});
		}
	},

	async update_habit({ locals }) {
		const { habit_id, name, days_per_month } = locals.form_data as {
			name: string;
			days_per_month: string;
			habit_id: number;
		};

		if (locals?.user?.id) {
			await db
				.update(habits)
				.set({ name, days_per_month: parseInt(days_per_month) })
				.where(eq(habits.id, habit_id));
		}
	},

	async add_check({ locals }) {
		const { habit_id, checked_at } = locals.form_data as {
			habit_id: string;
			checked_at: string;
		};
		if (locals?.user?.id) {
			await db.insert(checks).values({
				user_id: locals.user.id,
				habit_id: parseInt(habit_id),
				checked_at,
			});
		}
	},

	async remove_check({ locals }) {
		const { checked_at, habit_id } = locals.form_data as { checked_at: string; habit_id: number };

		if(locals?.user?.id) {
			await db
				.delete(checks)
				.where(
					and(
						eq(checks.habit_id, habit_id),
						eq(checks.user_id, locals?.user?.id),
						eq(checks.checked_at, checked_at),
					),
				);
		}
	},

	async hide_habit({ locals }) {
		const { habit_id } = locals.form_data as { habit_id: number };
		if (locals?.user?.id)
			await db.update(habits).set({ status: 'HIDDEN' }).where(
					and(
						eq(habits.id, habit_id),
						eq(habits.user_id, locals?.user?.id),
					),
				);
	},

	async archive_habit({ locals }) {
		const { habit_id } = locals.form_data as { habit_id: number };

		if (locals?.user?.id)
			await db.update(habits).set({ status: 'ARCHIVED' }).where(
					and(
						eq(habits.id, habit_id),
						eq(habits.user_id, locals?.user?.id),
					),
				);
	},
	
	async show_habit({ locals }) {
		const { habit_id } = locals.form_data as { habit_id: number };

		if (locals?.user?.id) {
		await db.update(habits).set({ status: 'VISIBLE' }).where(
					and(
						eq(habits.id, habit_id),
						eq(habits.user_id, locals?.user?.id),
					),
				);
					}
	},

	async delete_habit({ locals }) {
		const { habit_id } = locals.form_data as { habit_id: number };

		if (locals?.user?.id) {
			await db.delete(habits)
				.where(
					and(
						eq(habits.id, habit_id),
						eq(habits.user_id, locals?.user?.id),
					),
				);
					}
		}
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
