import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isValidLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { fetchCatalogProducts } from '@/lib/supabase/server';
import { BOUTIQUE_LOCATIONS } from '@/data/boutiques';
import { HomeClient } from '@/components/home/HomeClient';
import { siteConfig } from '@/lib/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.meta.siteTitle,
    description: dict.meta.siteDescription,
    alternates: {
      canonical: `${siteConfig.siteUrl}/${locale}`,
      languages: {
        ru: `${siteConfig.siteUrl}/ru`,
        kk: `${siteConfig.siteUrl}/kz`,
        en: `${siteConfig.siteUrl}/en`,
      },
    },
    openGraph: {
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      url: `${siteConfig.siteUrl}/${locale}`,
      locale: locale === 'kz' ? 'kk_KZ' : locale === 'en' ? 'en_US' : 'ru_KZ',
      images: ['/images/hero-campaign.svg'],
    },
  };
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const { products, source } = await fetchCatalogProducts();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <HomeClient
      locale={locale}
      featuredProducts={featured.length > 0 ? featured : products.slice(0, 4)}
      boutiques={BOUTIQUE_LOCATIONS}
      isDemoCatalog={source === 'demo'}
    />
  );
}
