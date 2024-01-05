import { relations } from 'drizzle-orm';
import { serial, text, timestamp, pgTable, date, integer, boolean } from 'drizzle-orm/pg-core';

export const habits = pgTable('habits', {
	id: serial('id').primaryKey(),
	name: text('name'),
	days_per_month: integer('days_per_month'),
	created_at: timestamp('created_at'),
	updated_at: timestamp('updated_at'),
	visible: boolean('hidden').default(true)
});

export const habitsRelations = relations(habits, ({ many }) => ({
	checks: many(checks)
}));

export const checks = pgTable('checks', {
	id: serial('id').primaryKey(),
	checked_at: date('date'),
	habit_id: integer('habit_id')
});

export const checksRelations = relations(checks, ({ one }) => ({
	habit: one(habits, {
		fields: [checks.habit_id],
		references: [habits.id]
	})
}));
