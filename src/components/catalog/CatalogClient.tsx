'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import {
  FragranceCategory,
  Locale,
  PerfumeProduct,
  ScentFamily,
} from '@/types/perfume';
import { getDictionary } from '@/i18n/dictionaries';
import {
  CATEGORY_LIST,
  getAllBrands,
  getLocalizedText,
  getMinimumPrice,
  SCENT_FAMILY_LIST,
} from '@/data/catalog';
import { ProductCard } from './ProductCard';

interface CatalogClientProps {
  locale: Locale;
  initialProducts: PerfumeProduct[];
  isDemoCatalog: boolean;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

export function CatalogClient({
  locale,
  initialProducts,
  isDemoCatalog,
}: CatalogClientProps) {
  const dict = getDictionary(locale);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<
    FragranceCategory | 'all'
  >('all');
  const [selectedFamily, setSelectedFamily] = useState<ScentFamily | 'all'>(
    'all'
  );
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const brands = useMemo(
    () => getAllBrands(initialProducts),
    [initialProducts]
  );

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedBrand !== 'all' ||
    selectedCategory !== 'all' ||
    selectedFamily !== 'all' ||
    inStockOnly ||
    sortBy !== 'featured';

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedBrand('all');
    setSelectedCategory('all');
    setSelectedFamily('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const filtered = initialProducts.filter((product) => {
      if (q) {
        const nameMatch =
          product.name.ru.toLowerCase().includes(q) ||
          product.name.kz.toLowerCase().includes(q) ||
          product.name.en.toLowerCase().includes(q);
        const brandMatch = product.brand.toLowerCase().includes(q);
        const subtitleMatch = getLocalizedText(product.subtitle, locale)
          .toLowerCase()
          .includes(q);
        if (!nameMatch && !brandMatch && !subtitleMatch) return false;
      }

      if (selectedBrand !== 'all' && product.brand !== selectedBrand) {
        return false;
      }

      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      if (
        selectedFamily !== 'all' &&
        !product.scentFamilies.includes(selectedFamily)
      ) {
        return false;
      }

      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'price-asc') {
        return getMinimumPrice(a) - getMinimumPrice(b);
      }
      if (sortBy === 'price-desc') {
        return getMinimumPrice(b) - getMinimumPrice(a);
      }
      if (sortBy === 'name-asc') {
        return getLocalizedText(a.name, locale).localeCompare(
          getLocalizedText(b.name, locale)
        );
      }
      // Default: featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [
    initialProducts,
    searchQuery,
    selectedBrand,
    selectedCategory,
    selectedFamily,
    inStockOnly,
    sortBy,
    locale,
  ]);

  const filterControls = (
    <div className="space-y-6">
      {/* Brand Filter */}
      <div className="space-y-2">
        <label className="block text-[11px] uppercase tracking-editorial text-champagne">
          {dict.catalog.brandFilter}
        </label>
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-full bg-obsidian border border-champagne/30 px-3.5 py-2.5 text-sm text-ivory focus:border-champagne focus:outline-none"
        >
          <option value="all">{dict.catalog.allBrands}</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="block text-[11px] uppercase tracking-editorial text-champagne">
          {dict.catalog.categoryFilter}
        </label>
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`text-left px-3 py-2 text-xs border transition-colors ${
              selectedCategory === 'all'
                ? 'border-champagne bg-burgundy text-white'
                : 'border-champagne/20 text-ivory/75 hover:border-champagne/50'
            }`}
          >
            {dict.catalog.allCategories}
          </button>
          {CATEGORY_LIST.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`text-left px-3 py-2 text-xs border transition-colors ${
                selectedCategory === cat
                  ? 'border-champagne bg-burgundy text-white'
                  : 'border-champagne/20 text-ivory/75 hover:border-champagne/50'
              }`}
            >
              {dict.categories[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Scent Family Filter */}
      <div className="space-y-2">
        <label className="block text-[11px] uppercase tracking-editorial text-champagne">
          {dict.catalog.scentFamilyFilter}
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedFamily('all')}
            className={`px-3 py-1.5 text-xs border transition-colors ${
              selectedFamily === 'all'
                ? 'border-champagne bg-burgundy text-white'
                : 'border-champagne/20 text-ivory/75 hover:border-champagne/50'
            }`}
          >
            {dict.catalog.allFamilies}
          </button>
          {SCENT_FAMILY_LIST.map((family) => (
            <button
              key={family}
              type="button"
              onClick={() => setSelectedFamily(family)}
              className={`px-3 py-1.5 text-xs border transition-colors ${
                selectedFamily === family
                  ? 'border-champagne bg-burgundy text-white'
                  : 'border-champagne/20 text-ivory/75 hover:border-champagne/50'
              }`}
            >
              {dict.scentFamilies[family]}
            </button>
          ))}
        </div>
      </div>

      {/* Availability Toggle */}
      <div className="pt-2 border-t border-champagne/15">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 accent-burgundy bg-obsidian border-champagne/40"
          />
          <span className="text-sm text-ivory/85">
            {dict.catalog.inStockOnly}
          </span>
        </label>
      </div>

      {/* Reset Filters Button */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={resetAllFilters}
          className="w-full py-2.5 px-4 border border-champagne/40 hover:border-champagne text-xs uppercase tracking-editorial text-champagne hover:text-ivory transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{dict.catalog.resetFilters}</span>
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-obsidian min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Catalog Header */}
        <div className="border-b border-champagne/20 pb-8 space-y-3">
          <p className="text-xs uppercase tracking-editorial text-champagne">
            {dict.catalog.eyebrow}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-ivory font-normal">
            {dict.catalog.title}
          </h1>
          <p className="text-sm sm:text-base text-ivory/70 max-w-2xl">
            {dict.catalog.subtitle}
          </p>
        </div>

        {isDemoCatalog && (
          <div className="px-4 py-3 border border-champagne/25 bg-ivory/[0.03] text-xs text-champagne">
            {dict.catalog.demoCatalogBanner}
          </div>
        )}

        {/* Top Search & Sort Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 text-champagne absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={dict.catalog.searchPlaceholder}
              className="w-full bg-[#1A1817] border border-champagne/30 pl-10 pr-4 py-3 text-sm text-ivory placeholder:text-ivory/45 focus:border-champagne focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Trigger */}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex-1 sm:flex-initial px-4 py-3 border border-champagne/35 text-xs uppercase tracking-editorial text-ivory flex items-center justify-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-champagne" />
              <span>{dict.catalog.filtersTitle}</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2 flex-1 sm:flex-initial">
              <label
                htmlFor="catalog-sort"
                className="hidden sm:inline text-xs uppercase tracking-wider text-champagne"
              >
                {dict.catalog.sortLabel}:
              </label>
              <select
                id="catalog-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full sm:w-auto bg-[#1A1817] border border-champagne/30 px-3.5 py-3 text-xs sm:text-sm text-ivory focus:border-champagne focus:outline-none"
              >
                <option value="featured">{dict.catalog.sortFeatured}</option>
                <option value="price-asc">{dict.catalog.sortPriceAsc}</option>
                <option value="price-desc">{dict.catalog.sortPriceDesc}</option>
                <option value="name-asc">{dict.catalog.sortNameAsc}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Grid with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 p-6 border border-champagne/20 bg-[#1A1817]/60 sticky top-28">
            {filterControls}
          </aside>

          {/* Products Area */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between text-xs text-ivory/65">
              <span>
                {dict.catalog.showingCount}:{' '}
                <strong className="text-ivory">
                  {filteredProducts.length}
                </strong>
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-champagne hover:text-ivory underline underline-offset-4"
                >
                  {dict.catalog.resetFilters}
                </button>
              )}
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    locale={locale}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="p-10 sm:p-16 border border-champagne/25 bg-[#1A1817]/50 text-center space-y-5">
                <p className="font-serif text-2xl sm:text-3xl text-ivory">
                  {dict.catalog.emptyTitle}
                </p>
                <p className="text-sm text-ivory/70 max-w-md mx-auto">
                  {dict.catalog.emptyDescription}
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="px-6 py-3 bg-burgundy hover:bg-burgundy-light text-white text-xs uppercase tracking-editorial transition-colors"
                  >
                    {dict.catalog.resetFilters}
                  </button>
                  <Link
                    href={`/${locale}/discovery`}
                    className="px-6 py-3 border border-champagne/40 hover:border-champagne text-ivory text-xs uppercase tracking-editorial transition-colors inline-flex items-center gap-2"
                  >
                    <Compass className="w-4 h-4 text-champagne" />
                    <span>{dict.nav.discovery}</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-obsidian/90 backdrop-blur-sm flex justify-end"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-sm bg-obsidian border-l border-champagne/30 h-full p-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-champagne/20">
                <h2 className="font-serif text-2xl text-ivory">
                  {dict.catalog.filtersTitle}
                </h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                  className="p-2 text-ivory hover:text-champagne"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {filterControls}
            </div>

            <div className="pt-6 border-t border-champagne/20 mt-6">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3.5 bg-burgundy text-white text-xs uppercase tracking-editorial"
              >
                {dict.catalog.showingCount}: {filteredProducts.length}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
