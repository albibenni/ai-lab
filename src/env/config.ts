import dotenv from "dotenv";
import { z } from "zod/v4";

// Load .env when not in production. Use NODE_ENV to pick env files if needed.
if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  dotenv.config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
  });
}

const EnvSchema = z.object({
  OPENAI_API_KEY: z.string().optional(),
  AI_GATEWAY_API_KEY: z.string().optional(),
  NODE_ENV: z.string().optional(),
});

const parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
  // Log validation issues but don't crash; allow opt-in keys.
  // If you want to enforce keys, change to throw an error here.
  // console.error("Environment validation failed:", parsed.error.format());
}

const env = parsed.success
  ? parsed.data
  : (process.env as unknown as Record<string, string>);

if (!env.OPENAI_API_KEY && !env.AI_GATEWAY_API_KEY) {
  console.warn(
    "Warning: neither OPENAI_API_KEY nor AI_GATEWAY_API_KEY is set. Some features may fail.",
  );
}

export default env;
