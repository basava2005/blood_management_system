import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Use local PostgreSQL connection instead of Neon
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:basava@123@localhost:5432/bloodnet';

export const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });
