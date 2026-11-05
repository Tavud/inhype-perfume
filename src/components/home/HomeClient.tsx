'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Clock,
  Compass,
  MapPin,
  Phone,
  Sparkles,
} from 'lucide-react';
import { BoutiqueLocation, Locale, PerfumeProduct } from '@/types/perfume';
import { getDictionary } from '@/i18n/dictionaries';
import { getLocalizedText } from '@/data/catalog';
import { ProductCard } from '@/components/catalog/ProductCard';

interface HomeClientProps {
  locale: Locale;
  featuredProducts: PerfumeProduct[];
  boutiques: BoutiqueLocation[];
  isDemoCatalog: boolean;
}

export function HomeClient({
  locale,
  featuredProducts,
  boutiques,
  isDemoCatalog,
}: HomeClientProps) {
  const dict = getDictionary(locale);

  return (
    <div className="bg-obsidian text-ivory">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center border-b border-champagne/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Editorial Copy */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-8"
            >
              <p className="text-xs uppercase tracking-editorial text-champagne">
                {dict.hero.eyebrow}
              </p>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[1.12] font-normal max-w-2xl">
                «{dict.hero.title}».
              </h1>

              <p className="text-base sm:text-lg text-ivory/80 leading-relaxed max-w-xl font-light">
                {dict.hero.subtitle}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href={`/${locale}/catalog`}
                  className="px-8 py-4 bg-burgundy hover:bg-burgundy-light text-white text-xs uppercase tracking-editorial transition-colors text-center flex items-center justify-center gap-3"
                >
                  <span>{dict.hero.primaryCta}</span>
                  <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                </Link>

                <Link
                  href={`/${locale}/discovery`}
                  className="px-8 py-4 border border-champagne/50 hover:border-champagne text-ivory hover:text-champagne text-xs uppercase tracking-editorial transition-colors text-center flex items-center justify-center gap-3"
                >
                  <Compass className="w-4 h-4 stroke-[1.5] text-champagne" />
                  <span>{dict.hero.secondaryCta}</span>
                </Link>
              </div>
            </motion.div>

            {/* Editorial Campaign Composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, ease: 'easeOut', delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="relative aspect-[5/6] w-full max-w-md mx-auto lg:max-w-none border border-champagne/30 bg-[#141312] overflow-hidden">
                <Image
                  src="/images/hero-campaign.svg"
                  alt="INHYPE Perfume Atelier Campaign"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-obsidian/90 via-obsidian/40 to-transparent p-5">
                  <p className="text-[11px] uppercase tracking-wider text-champagne/90">
                    {dict.hero.editorialCaption}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED FRAGRANCES SECTION */}
      <section className="py-20 lg:py-28 border-b border-champagne/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs uppercase tracking-editorial text-champagne">
                {dict.featured.eyebrow}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory font-normal">
                {dict.featured.title}
              </h2>
              <p className="text-sm sm:text-base text-ivory/70">
                {dict.featured.subtitle}
              </p>
            </div>

            <Link
              href={`/${locale}/catalog`}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-editorial text-champagne hover:text-ivory transition-colors pb-1 border-b border-champagne/40 self-start md:self-auto"
            >
              <span>{dict.featured.viewAll}</span>
              <ArrowRight className="w-4 h-4 stroke-[1.5]" />
            </Link>
          </div>

          {isDemoCatalog && (
            <div className="px-4 py-3 border border-champagne/25 bg-ivory/[0.03] text-xs text-champagne flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-champagne shrink-0" />
              <span>{dict.featured.demoNotice}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SCENT DISCOVERY SECTION */}
      <section className="py-20 lg:py-28 bg-[#1B1918] border-b border-champagne/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Visual Composition */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative aspect-[9/10] w-full max-w-md mx-auto lg:max-w-none border border-champagne/30 overflow-hidden bg-obsidian">
                <Image
                  src="/images/discovery-editorial.svg"
                  alt="INHYPE Scent Profiling"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text & Call to Action */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-champagne/30 text-champagne text-[11px] uppercase tracking-editorial">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{dict.discoveryBanner.eyebrow}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory leading-tight font-normal">
                {dict.discoveryBanner.title}
              </h2>

              <p className="text-base sm:text-lg text-ivory/80 leading-relaxed max-w-xl font-light">
                {dict.discoveryBanner.description}
              </p>

              <p className="text-xs uppercase tracking-wider text-champagne/80">
                {dict.discoveryBanner.stepLabel}
              </p>

              <div className="pt-2">
                <Link
                  href={`/${locale}/discovery`}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-ivory text-obsidian hover:bg-champagne hover:text-obsidian text-xs uppercase tracking-editorial font-medium transition-colors"
                >
                  <span>{dict.discoveryBanner.cta}</span>
                  <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRAND PHILOSOPHY SECTION (Visual Storytelling) */}
      <section
        id="about"
        className="py-20 lg:py-28 border-b border-champagne/20 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs uppercase tracking-editorial text-champagne">
                {dict.philosophy.eyebrow}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory leading-tight font-normal">
                {dict.philosophy.title}
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-ivory/80 leading-relaxed">
              <p className="font-serif text-xl sm:text-2xl text-ivory leading-snug">
                {dict.philosophy.lead}
              </p>
              <p className="text-sm sm:text-base text-ivory/75">
                {dict.philosophy.paragraph1}
              </p>
              <p className="text-sm sm:text-base text-ivory/75">
                {dict.philosophy.paragraph2}
              </p>
            </div>
          </div>

          {/* Three Architectural Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-4">
            <div className="p-6 sm:p-8 border border-champagne/20 bg-ivory/[0.02] space-y-3">
              <span className="font-serif text-2xl text-champagne">01</span>
              <h3 className="font-serif text-2xl text-ivory">
                {dict.philosophy.pillars.curationTitle}
              </h3>
              <p className="text-sm text-ivory/70 leading-relaxed">
                {dict.philosophy.pillars.curationText}
              </p>
            </div>

            <div className="p-6 sm:p-8 border border-champagne/20 bg-ivory/[0.02] space-y-3">
              <span className="font-serif text-2xl text-champagne">02</span>
              <h3 className="font-serif text-2xl text-ivory">
                {dict.philosophy.pillars.consultationTitle}
              </h3>
              <p className="text-sm text-ivory/70 leading-relaxed">
                {dict.philosophy.pillars.consultationText}
              </p>
            </div>

            <div className="p-6 sm:p-8 border border-champagne/20 bg-ivory/[0.02] space-y-3">
              <span className="font-serif text-2xl text-champagne">03</span>
              <h3 className="font-serif text-2xl text-ivory">
                {dict.philosophy.pillars.atmosphereTitle}
              </h3>
              <p className="text-sm text-ivory/70 leading-relaxed">
                {dict.philosophy.pillars.atmosphereText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOUTIQUES SECTION (Astana & Aktobe) */}
      <section
        id="boutiques"
        className="py-20 lg:py-28 scroll-mt-20 bg-obsidian"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs uppercase tracking-editorial text-champagne">
              {dict.boutiquesSection.eyebrow}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory font-normal">
              {dict.boutiquesSection.title}
            </h2>
            <p className="text-sm sm:text-base text-ivory/70">
              {dict.boutiquesSection.subtitle}
            </p>
          </div>

          {/* Explicit Verification Notice */}
          <div className="p-4 border border-burgundy bg-burgundy/15 text-xs sm:text-sm text-ivory/90 leading-relaxed">
            {dict.boutiquesSection.verificationDisclaimer}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {boutiques.map((branch) => (
              <div
                key={branch.id}
                className="border border-champagne/25 bg-[#1A1817] flex flex-col overflow-hidden"
              >
                <div className="relative aspect-[16/10] w-full bg-obsidian border-b border-champagne/20">
                  <Image
                    src={branch.image}
                    alt={getLocalizedText(branch.title, locale)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-obsidian/90 border border-champagne/40 text-[10px] uppercase tracking-wider text-champagne">
                      {branch.isConfirmed
                        ? dict.boutiquesSection.confirmedBadge
                        : dict.boutiquesSection.unconfirmedBadge}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-editorial text-champagne">
                      {getLocalizedText(branch.city, locale)}
                    </p>
                    <h3 className="font-serif text-2xl sm:text-3xl text-ivory">
                      {getLocalizedText(branch.title, locale)}
                    </h3>
                    <p className="text-sm text-ivory/70">
                      {getLocalizedText(branch.statusNote, locale)}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-champagne/15 space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-champagne/80">
                          {dict.boutiquesSection.addressLabel}
                        </span>
                        <span className="text-ivory/85">
                          {getLocalizedText(branch.address, locale)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-champagne/80">
                          {dict.boutiquesSection.hoursLabel}
                        </span>
                        <span className="text-ivory/85">
                          {getLocalizedText(branch.hours, locale)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-champagne/80">
                          {dict.boutiquesSection.contactLabel}
                        </span>
                        <span className="text-ivory/85">{branch.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
