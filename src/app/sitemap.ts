import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { siteConfig } from '@/lib/config';
import { DEMO_CATALOG } from '@/data/catalog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl;
  const entries: MetadataRoute.Sitemap = [];

  const staticRoutes = ['', '/catalog', '/discovery', '/favorites'];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '/catalog' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      });
    }

    for (const product of DEMO_CATALOG) {
      entries.push({
        url: `${baseUrl}/${locale}/catalog/${product.slug}`,
        lastModified: new Date(product.createdAt),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
