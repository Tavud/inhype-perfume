'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Bookmark,
  Check,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import { Locale, PerfumeProduct } from '@/types/perfume';
import { getDictionary } from '@/i18n/dictionaries';
import { formatPriceKzt } from '@/i18n/config';
import { getLocalizedText, getMinimumPrice } from '@/data/catalog';
import { useAtelierStore } from '@/context/AtelierStoreContext';

interface FavoritesClientProps {
  locale: Locale;
  catalogProducts: PerfumeProduct[];
}

export function FavoritesClient({
  locale,
  catalogProducts,
}: FavoritesClientProps) {
  const dict = getDictionary(locale);
  const { favorites, toggleFavorite, addToCart, isHydrated } =
    useAtelierStore();
  const [movedId, setMovedId] = useState<string | null>(null);

  const savedProducts = catalogProducts.filter((p) =>
    favorites.includes(p.id)
  );

  const handleMoveToCart = (product: PerfumeProduct) => {
    const inStockVol =
      product.volumes.find((v) => v.inStock) || product.volumes[0];
    if (!inStockVol || !inStockVol.inStock) return;
    addToCart(product, inStockVol.volumeMl, 1);
    setMovedId(product.id);
    setTimeout(() => setMovedId(null), 2000);
  };

  if (!isHydrated) {
    return (
      <div className="bg-obsidian min-h-[60vh] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse space-y-6">
          <div className="h-10 w-64 bg-ivory/15" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="h-80 bg-ivory/5" />
            <div className="h-80 bg-ivory/5" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-obsidian min-h-[75vh] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="border-b border-champagne/20 pb-8 space-y-3">
          <p className="text-xs uppercase tracking-editorial text-champagne">
            {dict.favorites.eyebrow}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-ivory font-normal">
            {dict.favorites.title}
          </h1>
          <p className="text-sm sm:text-base text-ivory/70 max-w-2xl">
            {dict.favorites.subtitle}
          </p>
        </div>

        {savedProducts.length === 0 ? (
          <div className="p-10 sm:p-16 border border-champagne/25 bg-[#1A1817]/50 text-center space-y-6">
            <div className="w-12 h-12 mx-auto border border-champagne/35 flex items-center justify-center text-champagne">
              <Bookmark className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl text-ivory">
                {dict.favorites.emptyTitle}
              </h2>
              <p className="text-sm text-ivory/70 max-w-md mx-auto">
                {dict.favorites.emptyDescription}
              </p>
            </div>
            <div>
              <Link
                href={`/${locale}/catalog`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-burgundy hover:bg-burgundy-light text-white text-xs uppercase tracking-editorial transition-colors"
              >
                <span>{dict.favorites.exploreCatalog}</span>
                <ArrowRight className="w-4 h-4 stroke-[1.5]" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {savedProducts.map((product) => {
                const name = getLocalizedText(product.name, locale);
                const subtitle = getLocalizedText(product.subtitle, locale);
                const minPrice = getMinimumPrice(product);
                const isJustMoved = movedId === product.id;

                return (
                  <article
                    key={product.id}
                    className="border border-champagne/25 bg-[#1A1817] flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[4/5] w-full bg-[#141312] border-b border-champagne/20 overflow-hidden">
                        <Link href={`/${locale}/catalog/${product.slug}`}>
                          <Image
                            src={
                              product.images[0] || '/images/hero-campaign.svg'
                            }
                            alt={name}
                            fill
                            sizes="(max-width: 640px) 100vw, 33vw"
                            className="object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggleFavorite(product.id)}
                          aria-label={dict.favorites.remove}
                          className="absolute top-3 right-3 p-2.5 bg-obsidian/85 border border-champagne/30 text-ivory/80 hover:text-burgundy-light transition-colors"
                        >
                          <Trash2 className="w-4 h-4 stroke-[1.5]" />
                        </button>
                      </div>

                      <div className="p-5 sm:p-6 space-y-2">
                        <p className="text-[11px] uppercase tracking-editorial text-champagne">
                          {product.brand}
                        </p>
                        <Link
                          href={`/${locale}/catalog/${product.slug}`}
                          className="block font-serif text-2xl text-ivory hover:text-champagne transition-colors"
                        >
                          {name}
                        </Link>
                        <p className="text-xs text-ivory/65 line-clamp-2">
                          {subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 pt-0 space-y-4">
                      <div className="pt-4 border-t border-champagne/15 flex items-baseline justify-between">
                        <span className="font-serif text-xl text-ivory">
                          {dict.catalog.fromPrice}{' '}
                          {formatPriceKzt(minPrice, locale)}
                        </span>
                        <span className="text-xs text-champagne">
                          {product.volumes.map((v) => `${v.volumeMl} ml`).join(' · ')}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          disabled={!product.inStock}
                          onClick={() => handleMoveToCart(product)}
                          className={`py-2.5 px-3 text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 ${
                            !product.inStock
                              ? 'bg-ivory/10 text-ivory/40 cursor-not-allowed'
                              : isJustMoved
                                ? 'bg-champagne text-obsidian font-medium'
                                : 'bg-burgundy hover:bg-burgundy-light text-white'
                          }`}
                        >
                          {isJustMoved ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>OK</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>{dict.favorites.moveToCart}</span>
                            </>
                          )}
                        </button>

                        <Link
                          href={`/${locale}/catalog/${product.slug}`}
                          className="py-2.5 px-3 border border-champagne/35 hover:border-champagne text-ivory text-xs uppercase tracking-wider text-center transition-colors"
                        >
                          {dict.featured.viewProduct}
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <p className="text-xs text-ivory/55 pt-4 border-t border-champagne/15">
              {dict.favorites.syncNote}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
