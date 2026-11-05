import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { isSupabaseConfigured, siteConfig } from '@/lib/config';
import { DEMO_CATALOG } from '@/data/catalog';
import {
  FragranceCategory,
  OlfactoryPyramid,
  OrderRecord,
  PerfumeProduct,
  ProductVolume,
  ScentCharacter,
  ScentFamily,
  ScentIntensity,
  ScentOccasion,
} from '@/types/perfume';

export async function createSupabaseServerClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(
    siteConfig.supabaseUrl,
    siteConfig.supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options?: Record<string, unknown>;
          }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Called from a Server Component where setting cookies is not permitted
          }
        },
      },
    }
  );
}

/**
 * Server-only Supabase Service Role client for privileged operations
 * after strict server-side authorization checks.
 */
export function createSupabaseServiceClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!isSupabaseConfigured() || !serviceRoleKey) {
    return null;
  }
  return createClient(siteConfig.supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export interface AdminAuthCheckResult {
  configured: boolean;
  authenticated: boolean;
  isAdmin: boolean;
  email: string | null;
  reason?: string;
}

/**
 * Strictly verifies administrator permissions on the server.
 * Never grants fake admin access when Supabase is unconfigured or when a visitor is unauthenticated.
 */
export async function verifyServerAdminAccess(): Promise<AdminAuthCheckResult> {
  if (!isSupabaseConfigured()) {
    return {
      configured: false,
      authenticated: false,
      isAdmin: false,
      email: null,
      reason: 'SUPABASE_NOT_CONFIGURED',
    };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return {
      configured: false,
      authenticated: false,
      isAdmin: false,
      email: null,
      reason: 'CLIENT_INIT_FAILED',
    };
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || !user.email) {
    return {
      configured: true,
      authenticated: false,
      isAdmin: false,
      email: null,
      reason: 'UNAUTHENTICATED',
    };
  }

  const allowedEmailsRaw = process.env.ADMIN_ALLOWED_EMAILS || '';
  const allowedEmails = allowedEmailsRaw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const emailLower = user.email.toLowerCase();

  // Check admin_users table in Supabase first
  const { data: adminRow } = await supabase
    .from('admin_users')
    .select('id, role')
    .eq('id', user.id)
    .maybeSingle();

  const isWhitelistedByEmail =
    allowedEmails.length > 0 && allowedEmails.includes(emailLower);

  const isAdmin = Boolean(adminRow || isWhitelistedByEmail);

  return {
    configured: true,
    authenticated: true,
    isAdmin,
    email: user.email,
    reason: isAdmin ? undefined : 'FORBIDDEN_NOT_ADMIN',
  };
}

interface DbProductRow {
  id: string;
  slug: string;
  brand: string;
  name_ru: string;
  name_kz: string;
  name_en: string;
  subtitle_ru: string;
  subtitle_kz: string;
  subtitle_en: string;
  description_ru: string;
  description_kz: string;
  description_en: string;
  editorial_note_ru: string | null;
  editorial_note_kz: string | null;
  editorial_note_en: string | null;
  category: FragranceCategory;
  scent_families: ScentFamily[];
  character_traits: ScentCharacter[];
  intensity: ScentIntensity;
  occasions: ScentOccasion[];
  concentration: string | null;
  olfactory_pyramid: OlfactoryPyramid | null;
  images: string[];
  featured: boolean;
  in_stock: boolean;
  created_at: string;
  product_volumes?: {
    volume_ml: number;
    price_kzt: number;
    in_stock: boolean;
    sku: string;
  }[];
}

function mapDbRowToProduct(row: DbProductRow): PerfumeProduct {
  const volumes: ProductVolume[] = (row.product_volumes || []).map((v) => ({
    volumeMl: Number(v.volume_ml),
    priceKzt: Number(v.price_kzt),
    inStock: Boolean(v.in_stock),
    sku: v.sku,
  }));

  return {
    id: row.id,
    slug: row.slug,
    brand: row.brand,
    name: {
      ru: row.name_ru,
      kz: row.name_kz || row.name_ru,
      en: row.name_en || row.name_ru,
    },
    subtitle: {
      ru: row.subtitle_ru,
      kz: row.subtitle_kz || row.subtitle_ru,
      en: row.subtitle_en || row.subtitle_ru,
    },
    description: {
      ru: row.description_ru,
      kz: row.description_kz || row.description_ru,
      en: row.description_en || row.description_ru,
    },
    editorialNote: row.editorial_note_ru
      ? {
          ru: row.editorial_note_ru,
          kz: row.editorial_note_kz || row.editorial_note_ru,
          en: row.editorial_note_en || row.editorial_note_ru,
        }
      : undefined,
    category: row.category,
    scentFamilies: row.scent_families || [],
    character: row.character_traits || [],
    intensity: row.intensity || 'moderate',
    occasions: row.occasions || [],
    concentration: row.concentration || undefined,
    olfactoryPyramid: row.olfactory_pyramid || undefined,
    volumes,
    images:
      row.images && row.images.length > 0
        ? row.images
        : ['/images/hero-campaign.svg'],
    featured: Boolean(row.featured),
    inStock: Boolean(row.in_stock),
    isDemoData: false,
    createdAt: row.created_at,
  };
}

/**
 * Fetches catalog products from Supabase if configured and populated;
 * otherwise returns the structured DEMO_CATALOG clearly flagged with `isDemoData: true`.
 */
export async function fetchCatalogProducts(): Promise<{
  products: PerfumeProduct[];
  source: 'supabase' | 'demo';
}> {
  if (!isSupabaseConfigured()) {
    return { products: DEMO_CATALOG, source: 'demo' };
  }

  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return { products: DEMO_CATALOG, source: 'demo' };
    }

    const { data, error } = await supabase
      .from('products')
      .select('*, product_volumes(*)')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return { products: DEMO_CATALOG, source: 'demo' };
    }

    return {
      products: (data as unknown as DbProductRow[]).map(mapDbRowToProduct),
      source: 'supabase',
    };
  } catch {
    return { products: DEMO_CATALOG, source: 'demo' };
  }
}

export async function fetchAdminOrders(): Promise<OrderRecord[]> {
  const auth = await verifyServerAdminAccess();
  if (!auth.isAdmin) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    id: String(row.id),
    orderNumber: String(row.order_number),
    customerName: String(row.customer_name),
    customerPhone: String(row.customer_phone),
    customerCity: String(row.customer_city),
    comment: row.comment ? String(row.comment) : undefined,
    items: Array.isArray(row.items) ? row.items : [],
    totalAmountKzt: Number(row.total_amount_kzt),
    locale: (row.locale as OrderRecord['locale']) || 'ru',
    status: (row.status as OrderRecord['status']) || 'pending_whatsapp',
    createdAt: String(row.created_at),
  }));
}
