'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { Locale, OrderCustomerInput } from '@/types/perfume';
import { getDictionary } from '@/i18n/dictionaries';
import { formatPriceKzt } from '@/i18n/config';
import { getLocalizedText } from '@/data/catalog';
import { useAtelierStore } from '@/context/AtelierStoreContext';
import {
  buildWhatsAppOrderMessage,
  buildWhatsAppUrl,
  validateCheckoutInput,
  ValidationErrors,
} from '@/lib/whatsapp';
import { isWhatsAppConfigured, siteConfig } from '@/lib/config';

interface CheckoutClientProps {
  locale: Locale;
}

export function CheckoutClient({ locale }: CheckoutClientProps) {
  const dict = getDictionary(locale);
  const { cart, totalAmountKzt, isHydrated } = useAtelierStore();

  const [customer, setCustomer] = useState<OrderCustomerInput>({
    fullName: '',
    phone: '',
    city: '',
    comment: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preparedMessage, setPreparedMessage] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const whatsappReady = isWhatsAppConfigured();

  const handlePrepareOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validateCheckoutInput(
      customer,
      cart,
      dict.checkout.validation
    );
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      let orderNumber = `INH-${Date.now().toString(36).toUpperCase().slice(-5)}`;

      try {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...customer,
            items: cart,
            totalAmountKzt,
            locale,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.orderNumber) {
            orderNumber = data.orderNumber;
          }
        }
      } catch {
        // Proceed with client-side message formatting even if offline
      }

      const message = buildWhatsAppOrderMessage(
        customer,
        cart,
        totalAmountKzt,
        locale,
        orderNumber
      );

      setPreparedMessage(message);
      setWhatsappUrl(buildWhatsAppUrl(message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyText = async () => {
    if (!preparedMessage) return;
    try {
      await navigator.clipboard.writeText(preparedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  if (!isHydrated) {
    return (
      <div className="bg-obsidian min-h-[60vh] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse space-y-6">
          <div className="h-10 w-64 bg-ivory/15" />
          <div className="h-64 w-full bg-ivory/5" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-obsidian min-h-screen py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <Link
            href={`/${locale}/cart`}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-editorial text-champagne hover:text-ivory transition-colors"
          >
            <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
            <span>{dict.checkout.backToCart}</span>
          </Link>
        </div>

        <div className="border-b border-champagne/20 pb-6 space-y-2">
          <p className="text-xs uppercase tracking-editorial text-champagne">
            INHYPE CONCIERGE
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-ivory font-normal">
            {dict.checkout.title}
          </h1>
          <p className="text-sm text-ivory/70 max-w-2xl">
            {dict.checkout.subtitle}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="p-10 border border-champagne/25 bg-[#1A1817]/50 text-center space-y-4">
            <p className="font-serif text-2xl text-ivory">
              {dict.cart.emptyTitle}
            </p>
            <Link
              href={`/${locale}/catalog`}
              className="inline-block px-6 py-3 bg-burgundy text-white text-xs uppercase tracking-editorial"
            >
              {dict.cart.exploreCatalog}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Customer Form & Prepared WhatsApp Card */}
            <div className="lg:col-span-7 space-y-8">
              <form
                onSubmit={handlePrepareOrder}
                noValidate
                className="p-6 sm:p-8 border border-champagne/25 bg-[#1A1817] space-y-6"
              >
                <h2 className="font-serif text-2xl text-ivory border-b border-champagne/20 pb-4">
                  {dict.checkout.customerDetails}
                </h2>

                {/* Full Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="checkout-name"
                    className="block text-xs uppercase tracking-wider text-champagne"
                  >
                    {dict.checkout.fullNameLabel}
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    value={customer.fullName}
                    onChange={(e) => {
                      setCustomer((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }));
                      setPreparedMessage(null);
                    }}
                    placeholder={dict.checkout.fullNamePlaceholder}
                    className="w-full bg-obsidian border border-champagne/35 px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-champagne focus:outline-none"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-400">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label
                    htmlFor="checkout-phone"
                    className="block text-xs uppercase tracking-wider text-champagne"
                  >
                    {dict.checkout.phoneLabel}
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => {
                      setCustomer((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }));
                      setPreparedMessage(null);
                    }}
                    placeholder={dict.checkout.phonePlaceholder}
                    className="w-full bg-obsidian border border-champagne/35 px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-champagne focus:outline-none"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-400">{errors.phone}</p>
                  )}
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label
                    htmlFor="checkout-city"
                    className="block text-xs uppercase tracking-wider text-champagne"
                  >
                    {dict.checkout.cityLabel}
                  </label>
                  <input
                    id="checkout-city"
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => {
                      setCustomer((prev) => ({
                        ...prev,
                        city: e.target.value,
                      }));
                      setPreparedMessage(null);
                    }}
                    placeholder={dict.checkout.cityPlaceholder}
                    className="w-full bg-obsidian border border-champagne/35 px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-champagne focus:outline-none"
                  />
                  {errors.city && (
                    <p className="text-xs text-red-400">{errors.city}</p>
                  )}
                </div>

                {/* Comment */}
                <div className="space-y-2">
                  <label
                    htmlFor="checkout-comment"
                    className="block text-xs uppercase tracking-wider text-champagne"
                  >
                    {dict.checkout.commentLabel}
                  </label>
                  <textarea
                    id="checkout-comment"
                    rows={3}
                    value={customer.comment}
                    onChange={(e) => {
                      setCustomer((prev) => ({
                        ...prev,
                        comment: e.target.value,
                      }));
                      setPreparedMessage(null);
                    }}
                    placeholder={dict.checkout.commentPlaceholder}
                    className="w-full bg-obsidian border border-champagne/35 px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-champagne focus:outline-none resize-none"
                  />
                </div>

                <p className="text-xs text-ivory/60 leading-relaxed">
                  {dict.checkout.disclaimer}
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-burgundy hover:bg-burgundy-light disabled:opacity-50 text-white text-xs uppercase tracking-editorial font-medium transition-colors"
                >
                  {isSubmitting
                    ? dict.checkout.submitting
                    : dict.checkout.submitWhatsApp}
                </button>
              </form>

              {/* Prepared Message Step (Explicit User Action Required to Open WhatsApp) */}
              {preparedMessage && (
                <div className="p-6 sm:p-8 border-2 border-champagne bg-[#1F1C1A] space-y-5">
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-ivory">
                      {dict.checkout.preparedTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed">
                      {dict.checkout.preparedNotice}
                    </p>
                  </div>

                  {/* Preview of Formatted Message */}
                  <pre className="p-4 bg-obsidian border border-champagne/25 text-xs text-ivory/90 whitespace-pre-wrap font-sans leading-relaxed overflow-x-auto">
                    {preparedMessage}
                  </pre>

                  {whatsappReady && whatsappUrl ? (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-4 px-6 bg-ivory text-obsidian hover:bg-champagne text-xs uppercase tracking-editorial font-semibold transition-colors flex items-center justify-center gap-2.5 text-center"
                      >
                        <MessageCircle className="w-4 h-4 stroke-[2]" />
                        <span>{dict.checkout.openWhatsAppAction}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        type="button"
                        onClick={handleCopyText}
                        className="py-4 px-5 border border-champagne/40 hover:border-champagne text-xs uppercase tracking-editorial text-ivory flex items-center justify-center gap-2"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 text-champagne" />
                            <span>{dict.checkout.copiedText}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-champagne" />
                            <span>{dict.checkout.copyOrderText}</span>
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    /* Clear Notice when NEXT_PUBLIC_WHATSAPP_NUMBER is not yet configured */
                    <div className="space-y-4">
                      <div className="p-4 border border-burgundy bg-burgundy/20 space-y-1.5">
                        <div className="flex items-center gap-2 text-champagne text-xs uppercase tracking-wider font-medium">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>
                            {dict.checkout.whatsappNotConfiguredTitle}
                          </span>
                        </div>
                        <p className="text-xs text-ivory/85 leading-relaxed">
                          {dict.checkout.whatsappNotConfiguredText}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <button
                          type="button"
                          onClick={handleCopyText}
                          className="flex-1 py-4 px-6 bg-ivory text-obsidian hover:bg-champagne text-xs uppercase tracking-editorial font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>{dict.checkout.copiedText}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>{dict.checkout.copyOrderText}</span>
                            </>
                          )}
                        </button>

                        <a
                          href={siteConfig.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-4 px-6 border border-champagne/40 hover:border-champagne text-xs uppercase tracking-editorial text-ivory flex items-center justify-center gap-2"
                        >
                          <span>Instagram {siteConfig.instagramHandle}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Order Items Summary */}
            <aside className="lg:col-span-5 p-6 sm:p-8 border border-champagne/25 bg-[#1A1817] space-y-6 sticky top-28">
              <h2 className="font-serif text-2xl text-ivory border-b border-champagne/20 pb-4">
                {dict.checkout.orderSummary}
              </h2>

              <ul className="divide-y divide-champagne/15">
                {cart.map((item) => {
                  const name = getLocalizedText(item.name, locale);
                  return (
                    <li
                      key={`${item.productId}-${item.volumeMl}`}
                      className="py-3.5 flex items-start justify-between gap-4 text-sm"
                    >
                      <div>
                        <p className="text-[10px] uppercase tracking-editorial text-champagne">
                          {item.brand}
                        </p>
                        <p className="text-ivory font-medium">{name}</p>
                        <p className="text-xs text-ivory/60">
                          {item.volumeMl} ml × {item.quantity}
                        </p>
                      </div>
                      <span className="font-serif text-lg text-ivory shrink-0">
                        {formatPriceKzt(item.priceKzt * item.quantity, locale)}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="pt-4 border-t border-champagne/25 flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-editorial text-champagne">
                  {dict.cart.total}
                </span>
                <span className="font-serif text-3xl text-ivory">
                  {formatPriceKzt(totalAmountKzt, locale)}
                </span>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
