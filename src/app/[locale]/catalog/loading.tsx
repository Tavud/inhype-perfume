import React from 'react';

export default function CatalogLoading() {
  return (
    <div className="bg-obsidian min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-pulse">
        <div className="border-b border-champagne/20 pb-8 space-y-3">
          <div className="h-3 w-36 bg-champagne/20" />
          <div className="h-10 w-72 bg-ivory/15" />
          <div className="h-4 w-96 max-w-full bg-ivory/10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="border border-champagne/15 bg-[#1A1817] aspect-[4/6]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
