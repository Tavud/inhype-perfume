import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isValidLocale } from '@/i18n/config';
import { fetchCatalogProducts } from '@/lib/supabase/server';
import {
  getLocalizedText,
  getMinimumPrice,
  getRelatedProducts,
} from '@/data/catalog';
import { ProductDetailClient } from '@/components/catalog/ProductDetailClient';
import { siteConfig } from '@/lib/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};

  const { products } = await fetchCatalogProducts();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Fragrance Not Found | INHYPE Perfume Atelier',
    };
  }

  const productName = getLocalizedText(product.name, locale);
  const subtitle = getLocalizedText(product.subtitle, locale);
  const title = `${product.brand.replace(' · DEMO', '')} — ${productName}`;

  return {
    title,
    description: subtitle,
    alternates: {
      canonical: `${siteConfig.siteUrl}/${locale}/catalog/${slug}`,
      languages: {
        ru: `${siteConfig.siteUrl}/ru/catalog/${slug}`,
        kk: `${siteConfig.siteUrl}/kz/catalog/${slug}`,
        en: `${siteConfig.siteUrl}/en/catalog/${slug}`,
      },
    },
    openGraph: {
      title: `${title} | INHYPE Perfume Atelier`,
      description: subtitle,
      url: `${siteConfig.siteUrl}/${locale}/catalog/${slug}`,
      images: product.images.length ? [product.images[0]] : undefined,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const { products } = await fetchCatalogProducts();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product, products, 3);

  // Only emit Product JSON-LD structured data for verified production records (!product.isDemoData)
  const jsonLd = !product.isDemoData
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: getLocalizedText(product.name, locale),
        brand: {
          '@type': 'Brand',
          name: product.brand,
        },
        description: getLocalizedText(product.description, locale),
        image: product.images.map((img) =>
          img.startsWith('http') ? img : `${siteConfig.siteUrl}${img}`
        ),
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'KZT',
          lowPrice: getMinimumPrice(product),
          offerCount: product.volumes.length,
          availability: product.inStock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductDetailClient
        product={product}
        relatedProducts={related}
        locale={locale}
      />
    </>
  );
}
