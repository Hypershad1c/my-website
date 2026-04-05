import { defineConfig } from '@prisma/config';
import 'dotenv/config'; 

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // This looks for the variable in your .env file. 
    // Do NOT paste the actual mongodb+srv:// string here.
    url: process.env.DATABASE_URL,
  },
});