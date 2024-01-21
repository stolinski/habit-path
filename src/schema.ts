import { relations } from 'drizzle-orm';
import {
	boolean,
	date,
	integer,
	pgEnum,
	pgTable,
	real,
	serial,
	text,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core';

export const status_enum = pgEnum('status_enum', ['HIDDEN', 'VISIBLE', 'ARCHIVED']);

export const habits = pgTable('habits', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	days_per_month: integer('days_per_month'),
	created_at: timestamp('created_at'),
	updated_at: timestamp('updated_at'),
	user_id: integer('user_id').notNull(),
	status: status_enum('status').default('VISIBLE').notNull(),
	order: real('order').default(100.0).notNull(),
});

export const habitsRelations = relations(habits, ({ many }) => ({
	checks: many(checks),
}));

export const checks = pgTable('checks', {
	id: serial('id').primaryKey(),
	checked_at: date('date').notNull(),
	habit_id: integer('habit_id').notNull(),
	user_id: integer('user_id').notNull(),
});

export const checksRelations = relations(checks, ({ one }) => ({
	habit: one(habits, {
		fields: [checks.habit_id],
		references: [habits.id],
	}),
}));

export const user = pgTable('auth_user', {
	id: serial('id').primaryKey(),
	email: varchar('varchar2', { length: 256 }),
		verified: boolean('verified').default(false).notNull(),
	hashed_password: varchar('hashed_password', {
		length: 255,
	}).notNull(),
});

export const waitlist = pgTable('waitlist', {
	id: serial('id').primaryKey(),
	email: varchar('varchar2', { length: 256 }).unique(),
	invited: boolean('invited').default(false),
});

export const session = pgTable('user_session', {
	id: serial('id').primaryKey(),
	user_id: integer('user_id')
		.notNull()
		.references(() => user.id),
	session_token: varchar('session_token', { length: 256 }),
});

export const user_habit_relation = relations(user, ({ many }) => ({
	habits: many(habits),
}));

export const user_checks_relation = relations(user, ({ many }) => ({
	checks: many(checks),
}));

export const checks_to_user_relation = relations(checks, ({ one }) => ({
	user: one(user, {
		fields: [checks.user_id],
		references: [user.id],
	}),
}));

export const habits_to_user_relation = relations(habits, ({ one }) => ({
	user: one(user, {
		fields: [habits.user_id],
		references: [user.id],
	}),
}));
