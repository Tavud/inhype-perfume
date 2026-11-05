import { createBrowserClient } from '@supabase/ssr';
import { isSupabaseConfigured, siteConfig } from '@/lib/config';

export function createSupabaseBrowserClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }
  return createBrowserClient(
    siteConfig.supabaseUrl,
    siteConfig.supabaseAnonKey
  );
}
