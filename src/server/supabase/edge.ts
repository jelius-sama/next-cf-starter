import { getRequestContext } from "@cloudflare/next-on-pages";
import { createServerClient as serverClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const getSupabaseEnv = (env: CloudflareEnv) => {
  return {
    SUPABASE_URL: env.SUPABASE_URL,
    SUPABASE_KEY: env.SUPABASE_KEY,
  };
};

export const createServerClient = () => {
  const cookieStore = cookies();
  const { env } = getRequestContext();
  const { SUPABASE_URL, SUPABASE_KEY } = getSupabaseEnv(env);

  return serverClient(
    SUPABASE_URL, SUPABASE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};
