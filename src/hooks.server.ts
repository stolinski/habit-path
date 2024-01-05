import type { Handle } from '@sveltejs/kit';
import * as schema from './schema';
import { sequence } from '@sveltejs/kit/hooks';
import { form_data } from 'sk-form-data';
import { DATABASE_URL } from '$env/static/private';
import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

neonConfig.fetchConnectionCache = true;

const sql = neon(DATABASE_URL);
export const db = drizzle(sql, { schema });

export const handle: Handle = sequence(form_data);
