'use client';

import React from 'react';

export default function CatalogError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-obsidian min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full border border-champagne/30 bg-[#1A1817] p-8 text-center space-y-4">
        <p className="text-xs uppercase tracking-editorial text-champagne">
          INHYPE PERFUME ATELIER
        </p>
        <h2 className="font-serif text-2xl text-ivory">
          Temporary Catalog Interruption
        </h2>
        <p className="text-sm text-ivory/70">
          We encountered an issue loading the fragrance collection. Please try
          refreshing.
        </p>
        <button
          type="button"
          onClick={reset}
          className="px-6 py-2.5 bg-burgundy text-white text-xs uppercase tracking-editorial"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
