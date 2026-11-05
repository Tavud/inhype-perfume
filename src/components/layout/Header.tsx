'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bookmark, Menu, ShoppingBag, Sparkles, X } from 'lucide-react';
import { Locale } from '@/types/perfume';
import { getDictionary } from '@/i18n/dictionaries';
import { localeLabels, locales } from '@/i18n/config';
import { useAtelierStore } from '@/context/AtelierStoreContext';

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const dict = getDictionary(locale);
  const pathname = usePathname() || `/${locale}`;
  const { totalItemsCount, favorites, isHydrated } = useAtelierStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const buildLocalizedHref = (targetLocale: Locale) => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      segments[0] = targetLocale;
      return `/${segments.join('/')}`;
    }
    return `/${targetLocale}`;
  };

  const navLinks = [
    { href: `/${locale}/catalog`, label: dict.nav.catalog },
    { href: `/${locale}/discovery`, label: dict.nav.discovery },
    { href: `/${locale}#about`, label: dict.nav.about },
    { href: `/${locale}#boutiques`, label: dict.nav.boutiques },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-obsidian/95 backdrop-blur-md border-b border-champagne/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href={`/${locale}`}
          className="group flex flex-col items-start focus:outline-none"
        >
          <span className="font-serif text-2xl sm:text-3xl tracking-widest text-ivory group-hover:text-champagne transition-colors">
            INHYPE
          </span>
          <span className="text-[10px] uppercase tracking-editorial text-champagne -mt-1">
            {dict.nav.brandSubtitle}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-8"
        >
          {navLinks.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== `/${locale}` &&
                !item.href.includes('#') &&
                pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs uppercase tracking-editorial transition-colors py-1 border-b ${
                  isActive
                    ? 'text-ivory border-champagne'
                    : 'text-ivory/75 border-transparent hover:text-ivory hover:border-champagne/40'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls: Language Switcher, Favorites, Cart, Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language Switcher RU / KZ / EN */}
          <div
            className="hidden sm:flex items-center border border-champagne/25 rounded-none px-1 py-0.5 bg-obsidian"
            role="group"
            aria-label="Language switcher"
          >
            {locales.map((loc) => {
              const active = loc === locale;
              return (
                <Link
                  key={loc}
                  href={buildLocalizedHref(loc)}
                  onClick={() => {
                    try {
                      window.localStorage.setItem('inhype_locale_v1', loc);
                    } catch {
                      // ignore
                    }
                  }}
                  className={`px-2 py-1 text-[11px] tracking-wider uppercase transition-colors ${
                    active
                      ? 'bg-burgundy text-white font-medium'
                      : 'text-champagne hover:text-ivory'
                  }`}
                  aria-current={active ? 'true' : undefined}
                >
                  {localeLabels[loc]}
                </Link>
              );
            })}
          </div>

          {/* Favorites Link */}
          <Link
            href={`/${locale}/favorites`}
            aria-label={dict.nav.favorites}
            className="relative p-2.5 text-ivory/85 hover:text-champagne transition-colors"
          >
            <Bookmark className="w-5 h-5 stroke-[1.5]" />
            {isHydrated && favorites.length > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-champagne text-obsidian text-[10px] font-semibold flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Shopping Bag Link */}
          <Link
            href={`/${locale}/cart`}
            aria-label={dict.nav.cart}
            className="relative flex items-center gap-2 px-3 py-2 border border-champagne/30 hover:border-champagne text-ivory transition-colors"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.5] text-champagne" />
            <span className="text-xs font-medium tracking-wider">
              {isHydrated ? totalItemsCount : 0}
            </span>
          </Link>

          {/* Mobile Drawer Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            className="lg:hidden p-2.5 text-ivory hover:text-champagne transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 stroke-[1.5]" />
            ) : (
              <Menu className="w-6 h-6 stroke-[1.5]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Over Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 z-50 bg-obsidian/98 backdrop-blur-lg border-t border-champagne/20 flex flex-col justify-between p-6 overflow-y-auto h-[calc(100dvh-5rem)]">
          <div className="space-y-6">
            <nav className="flex flex-col divide-y divide-champagne/15">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-4 text-lg font-serif tracking-wider text-ivory hover:text-champagne transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-sans text-champagne">→</span>
                </Link>
              ))}
              <Link
                href={`/${locale}/favorites`}
                onClick={() => setMobileMenuOpen(false)}
                className="py-4 text-lg font-serif tracking-wider text-ivory hover:text-champagne transition-colors flex items-center justify-between"
              >
                <span>{dict.nav.favorites}</span>
                <span className="text-xs font-sans text-champagne">
                  ({isHydrated ? favorites.length : 0})
                </span>
              </Link>
              <Link
                href={`/${locale}/cart`}
                onClick={() => setMobileMenuOpen(false)}
                className="py-4 text-lg font-serif tracking-wider text-ivory hover:text-champagne transition-colors flex items-center justify-between"
              >
                <span>{dict.nav.cart}</span>
                <span className="text-xs font-sans text-champagne">
                  ({isHydrated ? totalItemsCount : 0})
                </span>
              </Link>
            </nav>

            {/* Quick Discovery Banner in Mobile Menu */}
            <div className="p-4 border border-champagne/25 bg-burgundy/15 space-y-2">
              <div className="flex items-center gap-2 text-champagne text-xs uppercase tracking-editorial">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{dict.discoveryBanner.eyebrow}</span>
              </div>
              <p className="text-sm text-ivory/85">{dict.discoveryBanner.title}</p>
              <Link
                href={`/${locale}/discovery`}
                onClick={() => setMobileMenuOpen(false)}
                className="inline-block pt-1 text-xs uppercase tracking-editorial text-champagne underline underline-offset-4"
              >
                {dict.discoveryBanner.cta}
              </Link>
            </div>
          </div>

          {/* Mobile Language Switcher & Footer Info */}
          <div className="pt-6 border-t border-champagne/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-editorial text-champagne">
                RU / KZ / EN
              </span>
              <div className="flex items-center gap-2">
                {locales.map((loc) => {
                  const active = loc === locale;
                  return (
                    <Link
                      key={loc}
                      href={buildLocalizedHref(loc)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-3 py-1.5 text-xs uppercase tracking-wider border ${
                        active
                          ? 'bg-burgundy border-burgundy text-white'
                          : 'border-champagne/30 text-ivory/80'
                      }`}
                    >
                      {localeLabels[loc]}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
