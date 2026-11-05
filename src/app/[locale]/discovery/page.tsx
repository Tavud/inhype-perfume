import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isValidLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { fetchCatalogProducts } from '@/lib/supabase/server';
import { DiscoveryClient } from '@/components/discovery/DiscoveryClient';
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
    title: dict.meta.discoveryTitle,
    description: dict.meta.discoveryDescription,
    alternates: {
      canonical: `${siteConfig.siteUrl}/${locale}/discovery`,
      languages: {
        ru: `${siteConfig.siteUrl}/ru/discovery`,
        kk: `${siteConfig.siteUrl}/kz/discovery`,
        en: `${siteConfig.siteUrl}/en/discovery`,
      },
    },
  };
}

export default async function DiscoveryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const { products } = await fetchCatalogProducts();

  return <DiscoveryClient locale={locale} catalogProducts={products} />;
}
