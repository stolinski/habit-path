import { and, between, count, eq } from 'drizzle-orm';
import { db } from '../hooks.server';
import { checks, habits } from '../schema';

export const load = async ({ locals }) => {
	// let date_tree =
	// TODO function that builds date
	// Building blocks for how I want to query moving forward
		const habits_data = await db.query.habits.findMany({
			where: eq(habits.user_id, locals?.user?.id),
			with: {
				checks: {
					where: between(checks.checked_at, '2024-01-01', '2024-01-31'),
				},
			},
		});
		
	return {
		habits: transformData(habits_data),
	};
};

export const actions = {
	async new_habit({ locals }) {
		const { name, days_per_month } = locals.form_data as {
			name: string;
			days_per_month: string;
		};

	

		if (locals?.user?.id) {

			const result = await db.select({ count: count() }).from(habits).where(eq(habits.user_id, locals.user.id));
			const totalCount = result[0].count;

			await db.insert(habits).values({
				user_id: locals.user.id,
				name,
				days_per_month: parseInt(days_per_month),
				updated_at: new Date(),
				created_at: new Date(),
				order: totalCount * 10
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
				.set({ name, days_per_month: parseInt(days_per_month), updated_at: new Date()})
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
			await db.update(habits).set({ status: 'HIDDEN', updated_at: new Date() }).where(
					and(
						eq(habits.id, habit_id),
						eq(habits.user_id, locals?.user?.id),
					),
				);
	},

	async archive_habit({ locals }) {
		const { habit_id } = locals.form_data as { habit_id: number };

		if (locals?.user?.id)
			await db.update(habits).set({ status: 'ARCHIVED', updated_at: new Date()}).where(
					and(
						eq(habits.id, habit_id),
						eq(habits.user_id, locals?.user?.id),
					),
				);
	}, 
	
	async show_habit({ locals }) {
		const { habit_id } = locals.form_data as { habit_id: number };

		if (locals?.user?.id) {
		await db.update(habits).set({ status: 'VISIBLE', updated_at: new Date() }).where(
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


function transformData(data: (typeof habits.$inferSelect) & {checks: (typeof checks.$inferSelect)[]}[]):TransformedHabits[] {
  return data.map(item => ({
    ...item,
    checks: item.checks.map(check => check.checked_at)
  }));
}



export type TransformedHabits = {
	id: number
	status: 'VISIBLE' |'HIDDEN' | 'ARCHIVED'
	checks: string[]
	days_per_month: number | null
	name: string | null
}