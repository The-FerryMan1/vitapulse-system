import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
  path: path.resolve(__dirname, '..', '..', '..', '.env')
})
import { drizzle } from 'drizzle-orm/postgres-js';
// export const db = drizzle(process.env.DB_FILE_NAME!);
export const db = drizzle(process.env.DATABASE_URL!);
async function main() {
   const db = drizzle( process.env.DATABASE_URL!);
}

main()