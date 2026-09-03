import { z } from "zod";

const emptyToUndefined = (value: unknown) => (value === "" || value === undefined ? undefined : value);

const optionalUrl = z.preprocess(emptyToUndefined, z.string().url().optional());
const optionalHost = z.preprocess(emptyToUndefined, z.string().min(1).optional());
const siteUrl = z.preprocess(
  (value) => (value === "" || value === undefined ? "http://localhost:3000" : value),
  z.string().url(),
);

export const envSchema = z.object({
  NEXT_PUBLIC_API_URL: optionalUrl,
  NEXT_PUBLIC_SITE_URL: siteUrl,
  NEXT_PUBLIC_MEDIA_HOST: optionalHost,
  NEXT_PUBLIC_APP_ENV: z.enum(["development", "preview", "production"]).default("development"),
});

export type AppEnv = z.infer<typeof envSchema>;

export function parseEnv(input: {
  NEXT_PUBLIC_API_URL?: string;
  NEXT_PUBLIC_SITE_URL?: string;
  NEXT_PUBLIC_MEDIA_HOST?: string;
  NEXT_PUBLIC_APP_ENV?: string;
}): AppEnv {
  const parsed = envSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error(`Invalid environment configuration: ${parsed.error.message}`);
  }

  return parsed.data;
}

let cachedEnv: AppEnv | undefined;

export function getEnv(): AppEnv {
  cachedEnv ??= parseEnv({
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_MEDIA_HOST: process.env.NEXT_PUBLIC_MEDIA_HOST,
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  });

  return cachedEnv;
}

export function getApiUrl(): string | undefined {
  return getEnv().NEXT_PUBLIC_API_URL;
}

export function getSiteUrl(): string {
  return getEnv().NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
}

export function getMediaHost(): string | undefined {
  return getEnv().NEXT_PUBLIC_MEDIA_HOST;
}

export function isProduction(): boolean {
  return getEnv().NEXT_PUBLIC_APP_ENV === "production";
}
