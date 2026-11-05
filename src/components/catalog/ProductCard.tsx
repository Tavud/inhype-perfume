'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Bookmark } from 'lucide-react';
import { Locale, PerfumeProduct } from '@/types/perfume';
import { getDictionary } from '@/i18n/dictionaries';
import { formatPriceKzt } from '@/i18n/config';
import { getLocalizedText, getMinimumPrice } from '@/data/catalog';
import { useAtelierStore } from '@/context/AtelierStoreContext';

interface ProductCardProps {
  product: PerfumeProduct;
  locale: Locale;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const dict = getDictionary(locale);
  const { isFavorite, toggleFavorite, isHydrated } = useAtelierStore();
  const saved = isHydrated && isFavorite(product.id);

  const minPrice = getMinimumPrice(product);
  const availableVolumes = product.volumes.map((v) => `${v.volumeMl} ml`);
  const productName = getLocalizedText(product.name, locale);
  const productSubtitle = getLocalizedText(product.subtitle, locale);

  return (
    <article className="group relative flex flex-col bg-obsidian border border-champagne/20 hover:border-champagne/55 transition-colors duration-300">
      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#141312]">
        <Link
          href={`/${locale}/catalog/${product.slug}`}
          className="block w-full h-full focus:outline-none"
        >
          <Image
            src={product.images[0] || '/images/hero-campaign.svg'}
            alt={`${product.brand} — ${productName}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Availability & Category Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          <span
            className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium border ${
              product.inStock
                ? 'bg-obsidian/85 text-ivory border-champagne/35'
                : 'bg-obsidian/90 text-ivory/50 border-ivory/20'
            }`}
          >
            {product.inStock ? dict.catalog.inStock : dict.catalog.outOfStock}
          </span>
        </div>

        {/* Favorite Toggle Button */}
        <button
          type="button"
          onClick={() => toggleFavorite(product.id)}
          aria-label={
            saved
              ? dict.catalog.removeFromFavorites
              : dict.catalog.addToFavorites
          }
          className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center border transition-colors ${
            saved
              ? 'bg-burgundy border-burgundy text-white'
              : 'bg-obsidian/80 border-champagne/30 text-ivory hover:border-champagne hover:text-champagne'
          }`}
        >
          <Bookmark
            className={`w-4 h-4 stroke-[1.5] ${saved ? 'fill-current' : ''}`}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between p-5 sm:p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] uppercase tracking-editorial text-champagne truncate">
              {product.brand}
            </p>
            <span className="text-[10px] text-ivory/50 uppercase tracking-wider shrink-0">
              {dict.categories[product.category]}
            </span>
          </div>

          <Link
            href={`/${locale}/catalog/${product.slug}`}
            className="block group-hover:text-champagne transition-colors"
          >
            <h3 className="font-serif text-2xl text-ivory leading-snug">
              {productName}
            </h3>
          </Link>

          <p className="text-xs text-ivory/65 line-clamp-2 leading-relaxed">
            {productSubtitle}
          </p>
        </div>

        <div className="pt-4 border-t border-champagne/15 space-y-3">
          {/* Volumes & Price Row */}
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="text-[11px] text-ivory/55 mr-1">
                {dict.catalog.fromPrice}
              </span>
              <span className="font-serif text-xl text-ivory">
                {formatPriceKzt(minPrice, locale)}
              </span>
            </div>

            {availableVolumes.length > 0 && (
              <div className="text-[11px] text-champagne/90 tracking-wider">
                {availableVolumes.join(' · ')}
              </div>
            )}
          </div>

          {/* Action Link */}
          <Link
            href={`/${locale}/catalog/${product.slug}`}
            className="w-full py-2.5 px-4 border border-champagne/35 group-hover:border-champagne group-hover:bg-burgundy group-hover:text-white text-ivory text-xs uppercase tracking-editorial transition-colors flex items-center justify-between"
          >
            <span>{dict.catalog.viewDetails}</span>
            <ArrowUpRight className="w-4 h-4 stroke-[1.5]" />
          </Link>
        </div>
      </div>
    </article>
  );
}
