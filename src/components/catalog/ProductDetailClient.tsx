'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Bookmark,
  Check,
  Minus,
  Plus,
  ShoppingBag,
} from 'lucide-react';
import { Locale, PerfumeProduct } from '@/types/perfume';
import { getDictionary } from '@/i18n/dictionaries';
import { formatPriceKzt } from '@/i18n/config';
import { getLocalizedText } from '@/data/catalog';
import { useAtelierStore } from '@/context/AtelierStoreContext';
import { ProductCard } from './ProductCard';

interface ProductDetailClientProps {
  product: PerfumeProduct;
  relatedProducts: PerfumeProduct[];
  locale: Locale;
}

export function ProductDetailClient({
  product,
  relatedProducts,
  locale,
}: ProductDetailClientProps) {
  const dict = getDictionary(locale);
  const { addToCart, toggleFavorite, isFavorite, isHydrated } =
    useAtelierStore();

  const defaultVolume =
    product.volumes.find((v) => v.inStock) || product.volumes[0];
  const [selectedVolumeMl, setSelectedVolumeMl] = useState<number>(
    defaultVolume ? defaultVolume.volumeMl : 0
  );
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const activeVolume =
    product.volumes.find((v) => v.volumeMl === selectedVolumeMl) ||
    defaultVolume;
  const saved = isHydrated && isFavorite(product.id);
  const canPurchase = Boolean(product.inStock && activeVolume?.inStock);

  const handleAddToCart = () => {
    if (!activeVolume || !canPurchase) return;
    addToCart(product, activeVolume.volumeMl, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  const productName = getLocalizedText(product.name, locale);
  const productSubtitle = getLocalizedText(product.subtitle, locale);
  const productDescription = getLocalizedText(product.description, locale);
  const editorialNote = getLocalizedText(product.editorialNote, locale);

  return (
    <div className="bg-obsidian min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Back Breadcrumb */}
        <div>
          <Link
            href={`/${locale}/catalog`}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-editorial text-champagne hover:text-ivory transition-colors"
          >
            <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
            <span>{dict.product.backToCatalog}</span>
          </Link>
        </div>

        {/* Main Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/5] w-full bg-[#141312] border border-champagne/25 overflow-hidden">
              <Image
                src={
                  product.images[selectedImageIdx] ||
                  product.images[0] ||
                  '/images/hero-campaign.svg'
                }
                alt={`${product.brand} — ${productName}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              {product.isDemoData && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-obsidian/90 border border-champagne/35 text-[10px] uppercase tracking-wider text-champagne">
                    {dict.product.demoBadge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {product.images.map((imgUrl, index) => (
                  <button
                    key={imgUrl + index}
                    type="button"
                    onClick={() => setSelectedImageIdx(index)}
                    className={`relative aspect-[4/5] bg-[#141312] border transition-colors overflow-hidden ${
                      selectedImageIdx === index
                        ? 'border-champagne ring-1 ring-champagne'
                        : 'border-champagne/20 opacity-65 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`${productName} view ${index + 1}`}
                      fill
                      sizes="20vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details, Volume Selection, Olfactory Pyramid */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3 border-b border-champagne/20 pb-6">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs uppercase tracking-editorial text-champagne">
                  {product.brand}
                </p>
                <span className="text-xs text-ivory/60 uppercase tracking-wider">
                  {product.concentration || dict.categories[product.category]}
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl text-ivory font-normal">
                {productName}
              </h1>

              <p className="text-sm sm:text-base text-champagne/90 font-light">
                {productSubtitle}
              </p>

              {/* Price & Availability Row */}
              <div className="pt-3 flex items-baseline justify-between gap-4">
                <span className="font-serif text-3xl text-ivory">
                  {activeVolume
                    ? formatPriceKzt(activeVolume.priceKzt, locale)
                    : '—'}
                </span>
                <span
                  className={`text-xs uppercase tracking-wider px-2.5 py-1 border ${
                    canPurchase
                      ? 'border-champagne/40 text-champagne'
                      : 'border-ivory/20 text-ivory/50'
                  }`}
                >
                  {canPurchase ? dict.product.inStock : dict.product.outOfStock}
                </span>
              </div>
            </div>

            {/* Volume Selector */}
            {product.volumes.length > 0 && (
              <div className="space-y-3">
                <label className="block text-xs uppercase tracking-editorial text-champagne">
                  {dict.product.selectVolume}
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.volumes.map((vol) => {
                    const isSelected = vol.volumeMl === selectedVolumeMl;
                    return (
                      <button
                        key={vol.volumeMl}
                        type="button"
                        onClick={() => setSelectedVolumeMl(vol.volumeMl)}
                        className={`px-5 py-3 border text-left transition-colors min-w-[115px] ${
                          isSelected
                            ? 'border-champagne bg-burgundy text-white'
                            : vol.inStock
                              ? 'border-champagne/30 bg-[#1A1817] text-ivory hover:border-champagne/70'
                              : 'border-ivory/15 bg-obsidian text-ivory/40 line-through'
                        }`}
                      >
                        <span className="block text-sm font-medium">
                          {vol.volumeMl} ml
                        </span>
                        <span className="block text-xs opacity-85 mt-0.5">
                          {formatPriceKzt(vol.priceKzt, locale)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart Controls */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Quantity Counter */}
                <div className="flex items-center border border-champagne/35 bg-[#1A1817]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="p-3.5 text-ivory/80 hover:text-champagne transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 text-sm font-medium text-ivory min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                    aria-label="Increase quantity"
                    className="p-3.5 text-ivory/80 hover:text-champagne transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  disabled={!canPurchase}
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 px-6 text-xs uppercase tracking-editorial font-medium transition-colors flex items-center justify-center gap-2.5 ${
                    !canPurchase
                      ? 'bg-ivory/10 text-ivory/40 cursor-not-allowed border border-ivory/15'
                      : justAdded
                        ? 'bg-champagne text-obsidian'
                        : 'bg-burgundy hover:bg-burgundy-light text-white'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[2]" />
                      <span>{dict.product.addedToCart}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                      <span>{dict.product.addToCart}</span>
                    </>
                  )}
                </button>

                {/* Save to Favorites Button */}
                <button
                  type="button"
                  onClick={() => toggleFavorite(product.id)}
                  aria-label={
                    saved
                      ? dict.catalog.removeFromFavorites
                      : dict.catalog.addToFavorites
                  }
                  className={`p-4 border transition-colors flex items-center justify-center ${
                    saved
                      ? 'bg-burgundy border-burgundy text-white'
                      : 'border-champagne/35 text-ivory hover:border-champagne hover:text-champagne'
                  }`}
                >
                  <Bookmark
                    className={`w-5 h-5 stroke-[1.5] ${saved ? 'fill-current' : ''}`}
                  />
                </button>
              </div>
            </div>

            {/* Description & Curator Note */}
            <div className="space-y-4 pt-4 border-t border-champagne/20">
              <p className="text-sm sm:text-base text-ivory/80 leading-relaxed">
                {productDescription}
              </p>

              {editorialNote && (
                <div className="p-4 border-l-2 border-champagne bg-ivory/[0.03] space-y-1">
                  <p className="text-[11px] uppercase tracking-editorial text-champagne">
                    {dict.product.editorialNoteTitle}
                  </p>
                  <p className="text-xs sm:text-sm text-ivory/80 italic">
                    {editorialNote}
                  </p>
                </div>
              )}
            </div>

            {/* Olfactory Pyramid (Only rendered if pyramid data is present) */}
            {product.olfactoryPyramid && (
              <div className="space-y-4 pt-6 border-t border-champagne/20">
                <h2 className="font-serif text-2xl text-ivory">
                  {dict.product.olfactoryPyramid}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 border border-champagne/20 bg-[#1A1817]/70 space-y-2">
                    <span className="block text-[10px] uppercase tracking-editorial text-champagne">
                      {dict.product.topNotes}
                    </span>
                    <ul className="space-y-1 text-xs sm:text-sm text-ivory/85">
                      {product.olfactoryPyramid.top.map((note, idx) => (
                        <li key={idx}>{getLocalizedText(note, locale)}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 border border-champagne/20 bg-[#1A1817]/70 space-y-2">
                    <span className="block text-[10px] uppercase tracking-editorial text-champagne">
                      {dict.product.heartNotes}
                    </span>
                    <ul className="space-y-1 text-xs sm:text-sm text-ivory/85">
                      {product.olfactoryPyramid.heart.map((note, idx) => (
                        <li key={idx}>{getLocalizedText(note, locale)}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 border border-champagne/20 bg-[#1A1817]/70 space-y-2">
                    <span className="block text-[10px] uppercase tracking-editorial text-champagne">
                      {dict.product.baseNotes}
                    </span>
                    <ul className="space-y-1 text-xs sm:text-sm text-ivory/85">
                      {product.olfactoryPyramid.base.map((note, idx) => (
                        <li key={idx}>{getLocalizedText(note, locale)}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Olfactory Specifications Table */}
            <div className="pt-6 border-t border-champagne/20 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 border border-champagne/15 bg-ivory/[0.02]">
                <span className="block uppercase tracking-wider text-champagne mb-1">
                  {dict.product.scentFamiliesLabel}
                </span>
                <span className="text-ivory/85">
                  {product.scentFamilies
                    .map((f) => dict.scentFamilies[f])
                    .join(' · ')}
                </span>
              </div>

              <div className="p-3.5 border border-champagne/15 bg-ivory/[0.02]">
                <span className="block uppercase tracking-wider text-champagne mb-1">
                  {dict.product.intensityLabel}
                </span>
                <span className="text-ivory/85">
                  {dict.intensities[product.intensity]}
                </span>
              </div>

              <div className="p-3.5 border border-champagne/15 bg-ivory/[0.02]">
                <span className="block uppercase tracking-wider text-champagne mb-1">
                  {dict.product.characterLabel}
                </span>
                <span className="text-ivory/85">
                  {product.character.map((c) => dict.characters[c]).join(' · ')}
                </span>
              </div>

              <div className="p-3.5 border border-champagne/15 bg-ivory/[0.02]">
                <span className="block uppercase tracking-wider text-champagne mb-1">
                  {dict.product.occasionLabel}
                </span>
                <span className="text-ivory/85">
                  {product.occasions.map((o) => dict.occasions[o]).join(' · ')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="pt-16 border-t border-champagne/20 space-y-8">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl sm:text-4xl text-ivory font-normal">
                {dict.product.relatedTitle}
              </h2>
              <p className="text-sm text-ivory/70">
                {dict.product.relatedSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} locale={locale} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
