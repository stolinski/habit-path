import { relations } from 'drizzle-orm';
import {
	serial,
	text,
	timestamp,
	pgTable,
	date,
	integer,
	boolean,
	varchar
} from 'drizzle-orm/pg-core';

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
	habit_id: date('habit_id')
});

export const checksRelations = relations(checks, ({ one }) => ({
	habit: one(habits, {
		fields: [checks.habit_id],
		references: [habits.id]
	})
}));

export const user = pgTable('auth_user', {
	id: serial('id').primaryKey(),
	email: varchar('varchar2', { length: 256 }),
	hashed_password: varchar('hashed_password', {
		length: 255
	})
});

export const session = pgTable('user_session', {
	id: serial('id').primaryKey(),
	user_id: integer('user_id')
		.notNull()
		.references(() => user.id),
	session_token: varchar('session_token', { length: 256 })
});
