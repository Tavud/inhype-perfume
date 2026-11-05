export const siteConfig = {
  name: 'INHYPE Perfume Atelier',
  shortName: 'INHYPE',
  subtitle: 'Perfume Atelier',
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://inhype-atelier.kz',
  instagramHandle:
    process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || '@inhype_perfume',
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
    'https://www.instagram.com/inhype_perfume/',
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(
    /[^\d]/g,
    ''
  ),
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
};

export function isSupabaseConfigured(): boolean {
  return Boolean(
    siteConfig.supabaseUrl &&
      siteConfig.supabaseAnonKey &&
      siteConfig.supabaseUrl.startsWith('http')
  );
}

export function isWhatsAppConfigured(): boolean {
  return Boolean(
    siteConfig.whatsappNumber && siteConfig.whatsappNumber.length >= 10
  );
}
