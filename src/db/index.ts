import { env } from '@/env/env.server';
import { neon } from '@neondatabase/serverless';

export const sql = neon(env.DATABASE_URL);
