import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./drizzle/schema.ts",
  dbCredentials: {
    url: String(process.env.DATABASE_URL),
  },
  verbose: true,
  strict: true,
});
