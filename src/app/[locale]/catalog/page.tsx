import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isValidLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { fetchCatalogProducts } from '@/lib/supabase/server';
import { CatalogClient } from '@/components/catalog/CatalogClient';
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
    title: dict.meta.catalogTitle,
    description: dict.meta.catalogDescription,
    alternates: {
      canonical: `${siteConfig.siteUrl}/${locale}/catalog`,
      languages: {
        ru: `${siteConfig.siteUrl}/ru/catalog`,
        kk: `${siteConfig.siteUrl}/kz/catalog`,
        en: `${siteConfig.siteUrl}/en/catalog`,
      },
    },
    openGraph: {
      title: dict.meta.catalogTitle,
      description: dict.meta.catalogDescription,
      url: `${siteConfig.siteUrl}/${locale}/catalog`,
    },
  };
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const { products, source } = await fetchCatalogProducts();

  return (
    <CatalogClient
      locale={locale}
      initialProducts={products}
      isDemoCatalog={source === 'demo'}
    />
  );
}
