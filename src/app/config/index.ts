import dotenv from 'dotenv';
import path from 'path';

// we just connected the current file path with .env file path

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
