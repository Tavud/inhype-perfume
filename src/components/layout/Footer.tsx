'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink, Instagram, MapPin, ShieldCheck, X } from 'lucide-react';
import { Locale } from '@/types/perfume';
import { getDictionary } from '@/i18n/dictionaries';
import { localeFullNames, locales } from '@/i18n/config';
import { siteConfig } from '@/lib/config';

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const dict = getDictionary(locale);
  const pathname = usePathname() || `/${locale}`;
  const [activeLegalModal, setActiveLegalModal] = useState<
    'privacy' | 'terms' | null
  >(null);

  const buildLocalizedHref = (targetLocale: Locale) => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      segments[0] = targetLocale;
      return `/${segments.join('/')}`;
    }
    return `/${targetLocale}`;
  };

  return (
    <footer className="bg-obsidian border-t border-champagne/20 text-ivory/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Column 1: Brand Identity */}
          <div className="lg:col-span-4 space-y-5">
            <Link href={`/${locale}`} className="inline-block">
              <span className="block font-serif text-3xl tracking-widest text-ivory">
                INHYPE
              </span>
              <span className="block text-[10px] uppercase tracking-editorial text-champagne">
                {dict.nav.brandSubtitle}
              </span>
            </Link>
            <p className="text-sm text-ivory/70 leading-relaxed max-w-sm">
              {dict.footer.description}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-champagne/30 hover:border-champagne text-xs uppercase tracking-editorial text-ivory transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-champagne" />
                <span>{siteConfig.instagramHandle}</span>
                <ExternalLink className="w-3 h-3 text-champagne/70" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-editorial text-champagne font-medium">
              {dict.footer.navigationTitle}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href={`/${locale}/catalog`}
                  className="hover:text-champagne transition-colors"
                >
                  {dict.nav.catalog}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/discovery`}
                  className="hover:text-champagne transition-colors"
                >
                  {dict.nav.discovery}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#about`}
                  className="hover:text-champagne transition-colors"
                >
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#boutiques`}
                  className="hover:text-champagne transition-colors"
                >
                  {dict.nav.boutiques}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/favorites`}
                  className="hover:text-champagne transition-colors"
                >
                  {dict.nav.favorites}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/cart`}
                  className="hover:text-champagne transition-colors"
                >
                  {dict.nav.cart}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Geography & Contacts */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-editorial text-champagne font-medium">
              {dict.footer.contactsTitle}
            </h3>
            <div className="space-y-3 text-sm text-ivory/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <div>
                  <p className="text-ivory font-medium">
                    {dict.footer.citiesValue}
                  </p>
                  <p className="text-xs text-ivory/60 mt-1">
                    {dict.boutiquesSection.unconfirmedBadge}
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-xs uppercase tracking-wider text-champagne/80">
                  {dict.footer.instagramLabel}
                </p>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ivory hover:text-champagne underline underline-offset-4 transition-colors"
                >
                  {siteConfig.instagramHandle}
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Legal & Language Switcher */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs uppercase tracking-editorial text-champagne font-medium">
              {dict.footer.legalTitle}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveLegalModal('privacy')}
                  className="text-left hover:text-champagne transition-colors underline underline-offset-4 decoration-champagne/30"
                >
                  {dict.footer.privacyPolicy}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveLegalModal('terms')}
                  className="text-left hover:text-champagne transition-colors underline underline-offset-4 decoration-champagne/30"
                >
                  {dict.footer.orderTerms}
                </button>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-xs text-ivory/50 hover:text-champagne transition-colors pt-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{dict.nav.admin}</span>
                </Link>
              </li>
            </ul>

            <div className="pt-4 border-t border-champagne/15">
              <p className="text-[11px] uppercase tracking-editorial text-champagne mb-2">
                Language / Тіл / Язык
              </p>
              <div className="flex flex-wrap gap-2">
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={buildLocalizedHref(loc)}
                    className={`px-2.5 py-1 text-xs border transition-colors ${
                      loc === locale
                        ? 'border-champagne bg-burgundy text-white'
                        : 'border-champagne/25 text-ivory/70 hover:text-ivory hover:border-champagne/50'
                    }`}
                  >
                    {localeFullNames[loc]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-champagne/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/55">
          <p>{dict.footer.copyright}</p>
          <p className="tracking-wider uppercase text-[11px] text-champagne/80">
            INHYPE PERFUME ATELIER · ASTANA &amp; AKTOBE
          </p>
        </div>
      </div>

      {/* Legal & Order Terms Modal */}
      {activeLegalModal && (
        <div
          className="fixed inset-0 z-50 bg-obsidian/85 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-obsidian border border-champagne/40 max-w-xl w-full p-6 sm:p-8 space-y-5 relative shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveLegalModal(null)}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 text-ivory/70 hover:text-champagne"
            >
              <X className="w-5 h-5" />
            </button>

            <p className="text-[11px] uppercase tracking-editorial text-champagne">
              INHYPE PERFUME ATELIER
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl text-ivory">
              {activeLegalModal === 'privacy'
                ? dict.legal.privacyTitle
                : dict.legal.termsTitle}
            </h3>
            <p className="text-sm text-ivory/80 leading-relaxed">
              {activeLegalModal === 'privacy'
                ? dict.legal.privacyIntro
                : dict.legal.termsIntro}
            </p>
            <ul className="space-y-3 text-sm text-ivory/75 list-disc pl-5">
              {(activeLegalModal === 'privacy'
                ? dict.legal.privacyPoints
                : dict.legal.termsPoints
              ).map((point, idx) => (
                <li key={idx} className="leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveLegalModal(null)}
                className="px-6 py-2.5 bg-burgundy text-white text-xs uppercase tracking-editorial hover:bg-burgundy-light transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
