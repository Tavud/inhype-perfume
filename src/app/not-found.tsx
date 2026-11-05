import React from 'react';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-obsidian text-ivory flex items-center justify-center px-4">
      <div className="max-w-lg w-full border border-champagne/30 bg-[#1A1817] p-8 sm:p-12 text-center space-y-6">
        <p className="text-xs uppercase tracking-editorial text-champagne">
          INHYPE PERFUME ATELIER · 404
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-ivory font-normal">
          Страница не найдена
        </h1>
        <p className="text-sm text-ivory/70 leading-relaxed">
          Запрашиваемая страница не существует или была перемещена. Перейдите в
          каталог ароматов или на главную страницу.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/ru"
            className="px-6 py-3 bg-burgundy text-white text-xs uppercase tracking-editorial"
          >
            На главную
          </Link>
          <Link
            href="/ru/catalog"
            className="px-6 py-3 border border-champagne/40 text-ivory text-xs uppercase tracking-editorial"
          >
            Открыть каталог
          </Link>
        </div>
      </div>
    </div>
  );
}
