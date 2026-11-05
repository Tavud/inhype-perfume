'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import { Locale, PerfumeProduct } from '@/types/perfume';
import { getDictionary } from '@/i18n/dictionaries';
import { formatPriceKzt } from '@/i18n/config';
import { getLocalizedText } from '@/data/catalog';
import { useAtelierStore } from '@/context/AtelierStoreContext';

interface CartClientProps {
  locale: Locale;
  catalogProducts: PerfumeProduct[];
}

export function CartClient({ locale, catalogProducts }: CartClientProps) {
  const dict = getDictionary(locale);
  const {
    cart,
    isHydrated,
    removeFromCart,
    updateQuantity,
    changeItemVolume,
    totalAmountKzt,
  } = useAtelierStore();

  if (!isHydrated) {
    return (
      <div className="bg-obsidian min-h-[60vh] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse space-y-6">
          <div className="h-10 w-64 bg-ivory/15" />
          <div className="h-48 w-full bg-ivory/5 border border-champagne/15" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-obsidian min-h-[75vh] py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="border-b border-champagne/20 pb-6 space-y-2">
          <p className="text-xs uppercase tracking-editorial text-champagne">
            INHYPE PERFUME ATELIER
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-ivory font-normal">
            {dict.cart.title}
          </h1>
          <p className="text-sm text-ivory/70">{dict.cart.subtitle}</p>
        </div>

        {cart.length === 0 ? (
          <div className="p-10 sm:p-16 border border-champagne/25 bg-[#1A1817]/50 text-center space-y-6">
            <div className="w-12 h-12 mx-auto border border-champagne/35 flex items-center justify-center text-champagne">
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl text-ivory">
                {dict.cart.emptyTitle}
              </h2>
              <p className="text-sm text-ivory/70 max-w-md mx-auto">
                {dict.cart.emptyDescription}
              </p>
            </div>
            <div>
              <Link
                href={`/${locale}/catalog`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-burgundy hover:bg-burgundy-light text-white text-xs uppercase tracking-editorial transition-colors"
              >
                <span>{dict.cart.exploreCatalog}</span>
                <ArrowRight className="w-4 h-4 stroke-[1.5]" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 divide-y divide-champagne/20 border-t border-b border-champagne/20">
              {cart.map((item) => {
                const productRecord = catalogProducts.find(
                  (p) => p.id === item.productId
                );
                const availableVolumes =
                  productRecord?.volumes.filter((v) => v.inStock) || [];
                const lineTotal = item.priceKzt * item.quantity;
                const itemName = getLocalizedText(item.name, locale);

                return (
                  <div
                    key={`${item.productId}-${item.volumeMl}`}
                    className="py-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"
                  >
                    {/* Thumbnail */}
                    <Link
                      href={`/${locale}/catalog/${item.slug}`}
                      className="relative w-24 h-32 bg-[#141312] border border-champagne/25 shrink-0 overflow-hidden"
                    >
                      <Image
                        src={item.image}
                        alt={itemName}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </Link>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0 space-y-3 w-full">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[11px] uppercase tracking-editorial text-champagne">
                            {item.brand}
                          </p>
                          <Link
                            href={`/${locale}/catalog/${item.slug}`}
                            className="font-serif text-2xl text-ivory hover:text-champagne transition-colors"
                          >
                            {itemName}
                          </Link>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.productId, item.volumeMl)
                          }
                          aria-label={dict.cart.remove}
                          className="text-ivory/50 hover:text-burgundy-light transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4 stroke-[1.5]" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                        {/* Volume Selector */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-ivory/60">
                            {dict.cart.volume}:
                          </span>
                          {productRecord && availableVolumes.length > 1 ? (
                            <select
                              value={item.volumeMl}
                              onChange={(e) =>
                                changeItemVolume(
                                  productRecord,
                                  item.volumeMl,
                                  Number(e.target.value)
                                )
                              }
                              aria-label={dict.cart.volume}
                              className="bg-[#1A1817] border border-champagne/35 px-2.5 py-1 text-xs text-ivory focus:border-champagne focus:outline-none"
                            >
                              {availableVolumes.map((v) => (
                                <option key={v.volumeMl} value={v.volumeMl}>
                                  {v.volumeMl} ml —{' '}
                                  {formatPriceKzt(v.priceKzt, locale)}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <span className="text-xs font-medium text-champagne">
                              {item.volumeMl} ml
                            </span>
                          )}
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-champagne/30 bg-[#1A1817]">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.volumeMl,
                                item.quantity - 1
                              )
                            }
                            aria-label="Decrease quantity"
                            className="p-2 text-ivory/80 hover:text-champagne"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-medium text-ivory">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.volumeMl,
                                item.quantity + 1
                              )
                            }
                            aria-label="Increase quantity"
                            className="p-2 text-ivory/80 hover:text-champagne"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Line Total */}
                        <div className="text-right">
                          <span className="font-serif text-xl text-ivory">
                            {formatPriceKzt(lineTotal, locale)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary Box */}
            <aside className="lg:col-span-4 p-6 sm:p-8 border border-champagne/30 bg-[#1A1817] space-y-6 sticky top-28">
              <h2 className="font-serif text-2xl text-ivory border-b border-champagne/20 pb-4">
                {dict.checkout.orderSummary}
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-ivory/75">
                  <span>{dict.cart.subtotal}</span>
                  <span>{formatPriceKzt(totalAmountKzt, locale)}</span>
                </div>
                <div className="pt-3 border-t border-champagne/20 flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-editorial text-champagne">
                    {dict.cart.total}
                  </span>
                  <span className="font-serif text-3xl text-ivory">
                    {formatPriceKzt(totalAmountKzt, locale)}
                  </span>
                </div>
              </div>

              <p className="text-xs text-ivory/65 leading-relaxed">
                {dict.cart.conciergeNote}
              </p>

              <div className="space-y-3 pt-2">
                <Link
                  href={`/${locale}/checkout`}
                  className="w-full py-4 px-6 bg-burgundy hover:bg-burgundy-light text-white text-xs uppercase tracking-editorial font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <span>{dict.cart.proceedToCheckout}</span>
                  <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                </Link>

                <Link
                  href={`/${locale}/catalog`}
                  className="w-full py-3 px-6 border border-champagne/30 hover:border-champagne text-ivory/85 hover:text-ivory text-xs uppercase tracking-editorial transition-colors block text-center"
                >
                  {dict.cart.continueShopping}
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
