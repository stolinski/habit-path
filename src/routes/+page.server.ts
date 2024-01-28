import { endOfMonth, format, startOfMonth } from 'date-fns';
import { and, asc, between, count, eq } from 'drizzle-orm';
import { db } from '../hooks.server';
import { checks, habits } from '../schema';
import { transform_habits, update_habits_order } from '../server/data_utils';

export const load = async ({ locals, url }) => {
	const date = url.searchParams.get('date') || format(new Date(), 'yyyy-MM-dd');
	// Get first day of month and last day of month in 2024-01-01 format
	const firstDayOfMonth = format(startOfMonth(new Date(date)), 'yyyy-MM-dd');
	const lastDayOfMonth = format(endOfMonth(new Date(date)), 'yyyy-MM-dd');

	//  Add check for proper month between.
	const habits_data = await db.query.habits.findMany({
		where: eq(habits.user_id, locals?.user?.id),
		orderBy: [asc(habits.order)],
		with: {
			checks: {
				where: between(checks.checked_at, firstDayOfMonth, lastDayOfMonth),
			},
		},
	});

	return {
		habits: transform_habits(habits_data, date),
	};
};

export const actions = {
	async new_habit({ locals }) {
		const { name, days_per_month } = locals.form_data as {
			name: string;
			days_per_month: string;
		};

		if (locals?.user?.id) {
			const result = await db
				.select({ count: count() })
				.from(habits)
				.where(eq(habits.user_id, locals.user.id));
			const totalCount = result[0].count;

			await db.insert(habits).values({
				user_id: locals.user.id,
				name,
				days_per_month: parseInt(days_per_month),
				updated_at: new Date(),
				created_at: new Date(),
				order: totalCount * 10,
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
				.set({ name, days_per_month: parseInt(days_per_month), updated_at: new Date() })
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

		if (locals?.user?.id) {
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
			await db
				.update(habits)
				.set({ status: 'HIDDEN', updated_at: new Date() })
				.where(and(eq(habits.id, habit_id), eq(habits.user_id, locals?.user?.id)));
	},

	async archive_habit({ locals }) {
		const { habit_id } = locals.form_data as { habit_id: number };

		if (locals?.user?.id)
			await db
				.update(habits)
				.set({ status: 'ARCHIVED', updated_at: new Date() })
				.where(and(eq(habits.id, habit_id), eq(habits.user_id, locals?.user?.id)));
	},

	async show_habit({ locals }) {
		const { habit_id } = locals.form_data as { habit_id: number };

		if (locals?.user?.id) {
			await db
				.update(habits)
				.set({ status: 'VISIBLE', updated_at: new Date() })
				.where(and(eq(habits.id, habit_id), eq(habits.user_id, locals?.user?.id)));
		}
	},

	async delete_habit({ locals }) {
		const { habit_id } = locals.form_data as { habit_id: number };

		if (locals?.user?.id) {
			await db
				.delete(habits)
				.where(and(eq(habits.id, habit_id), eq(habits.user_id, locals?.user?.id)));
		}
	},
	async reorder({ locals }) {
		const { new_ids } = locals.form_data as { new_ids: string };
		const new_id_array = JSON.parse(new_ids);

		if (locals?.user?.id) {
			await update_habits_order(new_id_array, locals.user.id);
			return {
				message: 'Habits reordered successfully',
			};
		}
	},
};
