'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Database,
  Edit3,
  FolderKanban,
  Globe,
  ImagePlus,
  Lock,
  LogOut,
  Package,
  Plus,
  ShieldAlert,
  ShoppingBag,
} from 'lucide-react';
import {
  FragranceCategory,
  OrderRecord,
  OrderStatus,
  PerfumeProduct,
} from '@/types/perfume';
import { AdminAuthCheckResult } from '@/lib/supabase/server';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { CATEGORY_LIST } from '@/data/catalog';
import { formatPriceKzt } from '@/i18n/config';

interface AdminClientProps {
  authStatus: AdminAuthCheckResult;
  initialProducts: PerfumeProduct[];
  initialOrders: OrderRecord[];
  dataSource: 'supabase' | 'demo';
}

type AdminTab = 'products' | 'editor' | 'categories' | 'orders' | 'architecture';

export function AdminClient({
  authStatus,
  initialProducts,
  initialOrders,
  dataSource,
}: AdminClientProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>(
    authStatus.isAdmin ? 'products' : 'architecture'
  );
  const [products, setProducts] = useState<PerfumeProduct[]>(initialProducts);
  const [orders, setOrders] = useState<OrderRecord[]>(initialOrders);

  // Auth login state when Supabase is configured
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Product Editor state (only writable when authStatus.isAdmin === true)
  const [editingProduct, setEditingProduct] = useState<{
    id?: string;
    slug: string;
    brand: string;
    category: FragranceCategory;
    nameRu: string;
    nameKz: string;
    nameEn: string;
    subtitleRu: string;
    subtitleKz: string;
    subtitleEn: string;
    descriptionRu: string;
    descriptionKz: string;
    descriptionEn: string;
    inStock: boolean;
    featured: boolean;
    images: string[];
    volumes: {
      volumeMl: number;
      priceKzt: number;
      inStock: boolean;
      sku: string;
    }[];
  }>({
    slug: '',
    brand: '',
    category: 'eau-de-parfum',
    nameRu: '',
    nameKz: '',
    nameEn: '',
    subtitleRu: '',
    subtitleKz: '',
    subtitleEn: '',
    descriptionRu: '',
    descriptionKz: '',
    descriptionEn: '',
    inStock: true,
    featured: false,
    images: ['/images/hero-campaign.svg'],
    volumes: [{ volumeMl: 50, priceKzt: 95000, inStock: true, sku: 'INH-050' }],
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setAuthError('Supabase environment variables are not configured.');
      return;
    }

    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) {
        setAuthError(error.message);
      } else {
        window.location.reload();
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    const supabase = createSupabaseBrowserClient();
    if (supabase) {
      await supabase.auth.signOut();
      window.location.reload();
    }
  };

  const startEditingProduct = (product: PerfumeProduct) => {
    setEditingProduct({
      id: product.id,
      slug: product.slug,
      brand: product.brand,
      category: product.category,
      nameRu: product.name.ru,
      nameKz: product.name.kz,
      nameEn: product.name.en,
      subtitleRu: product.subtitle.ru,
      subtitleKz: product.subtitle.kz,
      subtitleEn: product.subtitle.en,
      descriptionRu: product.description.ru,
      descriptionKz: product.description.kz,
      descriptionEn: product.description.en,
      inStock: product.inStock,
      featured: product.featured,
      images: product.images,
      volumes: product.volumes.map((v) => ({ ...v })),
    });
    setActiveTab('editor');
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authStatus.isAdmin) {
      setStatusMessage(
        'Операция отклонена: требуется серверная авторизация администратора в Supabase.'
      );
      return;
    }

    setSaving(true);
    setStatusMessage(null);
    try {
      const method = editingProduct.id ? 'PATCH' : 'POST';
      const res = await fetch('/api/admin/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingProduct.id,
          slug: editingProduct.slug,
          brand: editingProduct.brand,
          category: editingProduct.category,
          name: {
            ru: editingProduct.nameRu,
            kz: editingProduct.nameKz,
            en: editingProduct.nameEn,
          },
          subtitle: {
            ru: editingProduct.subtitleRu,
            kz: editingProduct.subtitleKz,
            en: editingProduct.subtitleEn,
          },
          description: {
            ru: editingProduct.descriptionRu,
            kz: editingProduct.descriptionKz,
            en: editingProduct.descriptionEn,
          },
          inStock: editingProduct.inStock,
          featured: editingProduct.featured,
          images: editingProduct.images,
          volumes: editingProduct.volumes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatusMessage(`Ошибка сохранения: ${data.error}`);
      } else {
        setStatusMessage('Товар успешно сохранён в базе данных Supabase.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !authStatus.isAdmin) return;

    const formData = new FormData();
    formData.append('file', file);

    setSaving(true);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setEditingProduct((prev) => ({
          ...prev,
          images: [...prev.images, data.url],
        }));
        setStatusMessage('Изображение загружено в Supabase Storage.');
      } else {
        setStatusMessage(data.error || 'Ошибка загрузки файла');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleOrderStatusChange = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    if (!authStatus.isAdmin) return;
    const res = await fetch('/api/admin/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, status: newStatus }),
    });
    if (res.ok) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      {/* Top Admin Bar */}
      <header className="border-b border-champagne/25 bg-[#141312]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/ru"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-editorial text-champagne hover:text-ivory transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>На сайт</span>
            </Link>
            <span className="text-champagne/30">|</span>
            <div>
              <span className="font-serif text-xl tracking-widest text-ivory">
                INHYPE ATELIER
              </span>
              <span className="ml-2.5 text-[10px] uppercase tracking-editorial px-2 py-0.5 border border-champagne/35 text-champagne">
                Admin Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {authStatus.isAdmin ? (
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Admin: {authStatus.email}</span>
                </span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="px-3 py-1.5 border border-champagne/30 hover:border-champagne text-ivory inline-flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Выйти</span>
                </button>
              </div>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-burgundy bg-burgundy/20 text-champagne">
                <Lock className="w-3.5 h-3.5" />
                <span>
                  {authStatus.configured
                    ? 'Требуется вход администратора'
                    : 'Режим архитектуры (Supabase не подключён)'}
                </span>
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Server Security & Backend Status Banner */}
        {!authStatus.configured && (
          <div className="p-6 border border-champagne/35 bg-[#1A1817] space-y-4">
            <div className="flex items-start gap-3">
              <Database className="w-5 h-5 text-champagne shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h1 className="font-serif text-2xl text-ivory">
                  Архитектура административной панели INHYPE (Ожидание подключения Supabase)
                </h1>
                <p className="text-sm text-ivory/75 leading-relaxed">
                  Переменные окружения Supabase (<code>NEXT_PUBLIC_SUPABASE_URL</code>,{' '}
                  <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>,{' '}
                  <code>SUPABASE_SERVICE_ROLE_KEY</code>) ещё не заданы. В соответствии с
                  требованиями безопасности неавторизованным посетителям запрещено изменять
                  товары и заказы, а локальные демонстрационные данные не выдаются за
                  рабочую базу данных.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* If Supabase IS configured, but visitor is not logged in or not admin */}
        {authStatus.configured && !authStatus.isAdmin && (
          <div className="max-w-md mx-auto p-8 border border-champagne/35 bg-[#1A1817] space-y-6">
            <div className="space-y-2 text-center">
              <ShieldAlert className="w-8 h-8 text-champagne mx-auto stroke-[1.5]" />
              <h1 className="font-serif text-2xl text-ivory">
                Авторизация администратора INHYPE
              </h1>
              <p className="text-xs text-ivory/65">
                Доступ к изменению каталога и заказов проверяется на серверной
                стороне через Supabase Auth и таблицу <code>admin_users</code>.
              </p>
            </div>

            {authStatus.authenticated && !authStatus.isAdmin ? (
              <div className="p-4 border border-red-500/40 bg-red-950/20 text-xs text-red-300 space-y-3">
                <p>
                  Аккаунт <strong>{authStatus.email}</strong> не входит в список
                  администраторов <code>admin_users</code> или{' '}
                  <code>ADMIN_ALLOWED_EMAILS</code>.
                </p>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-burgundy text-white uppercase tracking-wider"
                >
                  Сменить аккаунт
                </button>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-champagne mb-1.5">
                    Email администратора
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-obsidian border border-champagne/35 px-3.5 py-2.5 text-sm text-ivory focus:border-champagne focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-champagne mb-1.5">
                    Пароль
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-obsidian border border-champagne/35 px-3.5 py-2.5 text-sm text-ivory focus:border-champagne focus:outline-none"
                  />
                </div>
                {authError && (
                  <p className="text-xs text-red-400">{authError}</p>
                )}
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3 bg-burgundy hover:bg-burgundy-light text-white text-xs uppercase tracking-editorial"
                >
                  {authLoading ? 'Проверка...' : 'Войти в панель управления'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Navigation Tabs for Admin Modules */}
        <div className="flex flex-wrap gap-2 border-b border-champagne/20 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2.5 text-xs uppercase tracking-editorial border transition-colors inline-flex items-center gap-2 ${
              activeTab === 'architecture'
                ? 'bg-burgundy border-champagne text-white'
                : 'border-champagne/25 text-ivory/75 hover:border-champagne'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Интеграция &amp; Схема БД</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 text-xs uppercase tracking-editorial border transition-colors inline-flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-burgundy border-champagne text-white'
                : 'border-champagne/25 text-ivory/75 hover:border-champagne'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Товары ({products.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-2.5 text-xs uppercase tracking-editorial border transition-colors inline-flex items-center gap-2 ${
              activeTab === 'editor'
                ? 'bg-burgundy border-champagne text-white'
                : 'border-champagne/25 text-ivory/75 hover:border-champagne'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Создание / Редактирование и Переводы</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2.5 text-xs uppercase tracking-editorial border transition-colors inline-flex items-center gap-2 ${
              activeTab === 'categories'
                ? 'bg-burgundy border-champagne text-white'
                : 'border-champagne/25 text-ivory/75 hover:border-champagne'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Категории</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 text-xs uppercase tracking-editorial border transition-colors inline-flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-burgundy border-champagne text-white'
                : 'border-champagne/25 text-ivory/75 hover:border-champagne'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Заказы ({orders.length})</span>
          </button>
        </div>

        {statusMessage && (
          <div className="p-4 border border-champagne bg-burgundy/20 text-xs text-ivory">
            {statusMessage}
          </div>
        )}

        {/* TAB 1: ARCHITECTURE & SUPABASE SETUP GUIDE */}
        {activeTab === 'architecture' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 p-6 sm:p-8 border border-champagne/25 bg-[#1A1817] space-y-5">
              <h2 className="font-serif text-2xl text-ivory">
                Инструкция по подключению Supabase Backend
              </h2>
              <ol className="space-y-4 text-sm text-ivory/80 list-decimal pl-5 leading-relaxed">
                <li>
                  Создайте проект в Supabase и выполните SQL-миграцию из файла{' '}
                  <code className="text-champagne">
                    supabase/migrations/001_initial_schema.sql
                  </code>{' '}
                  в SQL Editor. Она создаст таблицы <code>admin_users</code>,{' '}
                  <code>categories</code>, <code>products</code>,{' '}
                  <code>product_volumes</code>, <code>orders</code> и защищённый
                  Storage bucket <code>perfume-images</code> с политиками RLS.
                </li>
                <li>
                  Скопируйте <code>.env.example</code> в <code>.env.local</code>{' '}
                  и укажите <code>NEXT_PUBLIC_SUPABASE_URL</code>,{' '}
                  <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> и серверный ключ{' '}
                  <code>SUPABASE_SERVICE_ROLE_KEY</code> (используется только на
                  сервере, никогда не передаётся в браузер).
                </li>
                <li>
                  Добавьте email администратора в переменную{' '}
                  <code>ADMIN_ALLOWED_EMAILS</code> или добавьте запись
                  пользователя в таблицу <code>public.admin_users</code>.
                </li>
                <li>
                  Укажите подтверждённый номер WhatsApp компании в{' '}
                  <code>NEXT_PUBLIC_WHATSAPP_NUMBER</code> (только цифры с кодом
                  страны, например <code>77001234567</code>).
                </li>
              </ol>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 border border-champagne/25 bg-[#1A1817] space-y-4">
              <h3 className="font-serif text-2xl text-ivory">
                Статус текущего окружения
              </h3>
              <ul className="space-y-3 text-xs">
                <li className="flex items-center justify-between py-2 border-b border-champagne/15">
                  <span className="text-ivory/70">Подключение Supabase:</span>
                  <span className="text-champagne font-medium">
                    {authStatus.configured
                      ? 'Настроено'
                      : 'Не подключено (режим предпросмотра)'}
                  </span>
                </li>
                <li className="flex items-center justify-between py-2 border-b border-champagne/15">
                  <span className="text-ivory/70">Источник каталога:</span>
                  <span className="text-champagne font-medium uppercase">
                    {dataSource === 'supabase'
                      ? 'Supabase Live DB'
                      : 'Централизованный Demo-каталог'}
                  </span>
                </li>
                <li className="flex items-center justify-between py-2 border-b border-champagne/15">
                  <span className="text-ivory/70">Серверная авторизация:</span>
                  <span className="text-champagne font-medium">
                    {authStatus.isAdmin
                      ? 'Активна (Права подтверждены)'
                      : 'Заблокирована для гостей (Read-Only)'}
                  </span>
                </li>
                <li className="flex items-center justify-between py-2">
                  <span className="text-ivory/70">SQL Миграция:</span>
                  <span className="text-ivory">
                    supabase/migrations/001_initial_schema.sql
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS LIST */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-ivory">
                Номенклатура каталога ({dataSource === 'demo' ? 'Демо-данные' : 'База данных Supabase'})
              </h2>
              <button
                type="button"
                onClick={() => {
                  setEditingProduct({
                    slug: '',
                    brand: '',
                    category: 'eau-de-parfum',
                    nameRu: '',
                    nameKz: '',
                    nameEn: '',
                    subtitleRu: '',
                    subtitleKz: '',
                    subtitleEn: '',
                    descriptionRu: '',
                    descriptionKz: '',
                    descriptionEn: '',
                    inStock: true,
                    featured: false,
                    images: ['/images/hero-campaign.svg'],
                    volumes: [
                      {
                        volumeMl: 50,
                        priceKzt: 95000,
                        inStock: true,
                        sku: 'INH-NEW-050',
                      },
                    ],
                  });
                  setActiveTab('editor');
                }}
                className="px-4 py-2.5 bg-burgundy text-white text-xs uppercase tracking-editorial inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Создать товар</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-champagne/25 bg-[#1A1817]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-champagne/25 text-[11px] uppercase tracking-wider text-champagne bg-obsidian/60">
                    <th className="p-4">Аромат / Бренд</th>
                    <th className="p-4">Категория</th>
                    <th className="p-4">Объёмы и цены</th>
                    <th className="p-4">Наличие</th>
                    <th className="p-4">Переводы</th>
                    <th className="p-4 text-right">Действие</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-champagne/15">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-ivory/[0.02]">
                      <td className="p-4">
                        <p className="text-[11px] uppercase tracking-wider text-champagne">
                          {p.brand}
                        </p>
                        <p className="font-serif text-lg text-ivory">
                          {p.name.ru}
                        </p>
                        <p className="text-[11px] text-ivory/50">/{p.slug}</p>
                      </td>
                      <td className="p-4 text-xs text-ivory/80">
                        {p.category}
                      </td>
                      <td className="p-4 text-xs space-y-1">
                        {p.volumes.map((v) => (
                          <div key={v.volumeMl}>
                            <span className="text-champagne">{v.volumeMl} мл:</span>{' '}
                            <span>{formatPriceKzt(v.priceKzt, 'ru')}</span>
                          </div>
                        ))}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 text-[11px] border ${
                            p.inStock
                              ? 'border-champagne/40 text-champagne'
                              : 'border-ivory/20 text-ivory/40'
                          }`}
                        >
                          {p.inStock ? 'В наличии' : 'Нет'}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-ivory/75">
                        RU · KZ · EN
                      </td>
                      <td className="p-4 text-right">
                        <button
                          type="button"
                          onClick={() => startEditingProduct(p)}
                          className="px-3 py-1.5 border border-champagne/35 hover:border-champagne text-xs text-ivory"
                        >
                          Открыть в редакторе
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCT & MULTILINGUAL EDITOR */}
        {activeTab === 'editor' && (
          <form
            onSubmit={handleSaveProduct}
            className="p-6 sm:p-8 border border-champagne/25 bg-[#1A1817] space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-champagne/20 pb-4">
              <div>
                <h2 className="font-serif text-2xl text-ivory">
                  {editingProduct.id
                    ? `Редактирование товара: ${editingProduct.nameRu}`
                    : 'Создание нового товара'}
                </h2>
                <p className="text-xs text-ivory/65">
                  Управление карточкой, объёмами, ценами, наличием, изображениями и переводами RU / KZ / EN
                </p>
              </div>
              {!authStatus.isAdmin && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-burgundy bg-burgundy/25 text-xs text-champagne">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Запись отключена до авторизации администратора</span>
                </span>
              )}
            </div>

            {/* Core Identity */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-champagne mb-1.5">
                  Slug (ЧПУ URL)
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.slug}
                  onChange={(e) =>
                    setEditingProduct((prev) => ({
                      ...prev,
                      slug: e.target.value,
                    }))
                  }
                  placeholder="velours-d-ombre"
                  className="w-full bg-obsidian border border-champagne/35 px-3.5 py-2.5 text-sm text-ivory"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-champagne mb-1.5">
                  Бренд / Дом
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.brand}
                  onChange={(e) =>
                    setEditingProduct((prev) => ({
                      ...prev,
                      brand: e.target.value,
                    }))
                  }
                  placeholder="MAISON CRIVELLI"
                  className="w-full bg-obsidian border border-champagne/35 px-3.5 py-2.5 text-sm text-ivory"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-champagne mb-1.5">
                  Категория
                </label>
                <select
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct((prev) => ({
                      ...prev,
                      category: e.target.value as FragranceCategory,
                    }))
                  }
                  className="w-full bg-obsidian border border-champagne/35 px-3.5 py-2.5 text-sm text-ivory"
                >
                  {CATEGORY_LIST.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Multilingual Translations (RU / KZ / EN) */}
            <div className="space-y-4 pt-4 border-t border-champagne/20">
              <div className="flex items-center gap-2 text-champagne text-xs uppercase tracking-editorial">
                <Globe className="w-4 h-4" />
                <span>Управление переводами (RU / KZ / EN)</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Russian */}
                <div className="p-4 border border-champagne/20 bg-obsidian/60 space-y-3">
                  <span className="text-xs font-semibold text-champagne uppercase">
                    Русский (RU)
                  </span>
                  <input
                    type="text"
                    placeholder="Название (RU)"
                    value={editingProduct.nameRu}
                    onChange={(e) =>
                      setEditingProduct((p) => ({
                        ...p,
                        nameRu: e.target.value,
                      }))
                    }
                    className="w-full bg-obsidian border border-champagne/30 px-3 py-2 text-xs text-ivory"
                  />
                  <input
                    type="text"
                    placeholder="Краткий подзаголовок нот (RU)"
                    value={editingProduct.subtitleRu}
                    onChange={(e) =>
                      setEditingProduct((p) => ({
                        ...p,
                        subtitleRu: e.target.value,
                      }))
                    }
                    className="w-full bg-obsidian border border-champagne/30 px-3 py-2 text-xs text-ivory"
                  />
                  <textarea
                    rows={3}
                    placeholder="Полное описание (RU)"
                    value={editingProduct.descriptionRu}
                    onChange={(e) =>
                      setEditingProduct((p) => ({
                        ...p,
                        descriptionRu: e.target.value,
                      }))
                    }
                    className="w-full bg-obsidian border border-champagne/30 px-3 py-2 text-xs text-ivory"
                  />
                </div>

                {/* Kazakh */}
                <div className="p-4 border border-champagne/20 bg-obsidian/60 space-y-3">
                  <span className="text-xs font-semibold text-champagne uppercase">
                    Қазақша (KZ)
                  </span>
                  <input
                    type="text"
                    placeholder="Атауы (KZ)"
                    value={editingProduct.nameKz}
                    onChange={(e) =>
                      setEditingProduct((p) => ({
                        ...p,
                        nameKz: e.target.value,
                      }))
                    }
                    className="w-full bg-obsidian border border-champagne/30 px-3 py-2 text-xs text-ivory"
                  />
                  <input
                    type="text"
                    placeholder="Қысқаша сипаттамасы (KZ)"
                    value={editingProduct.subtitleKz}
                    onChange={(e) =>
                      setEditingProduct((p) => ({
                        ...p,
                        subtitleKz: e.target.value,
                      }))
                    }
                    className="w-full bg-obsidian border border-champagne/30 px-3 py-2 text-xs text-ivory"
                  />
                  <textarea
                    rows={3}
                    placeholder="Толық сипаттамасы (KZ)"
                    value={editingProduct.descriptionKz}
                    onChange={(e) =>
                      setEditingProduct((p) => ({
                        ...p,
                        descriptionKz: e.target.value,
                      }))
                    }
                    className="w-full bg-obsidian border border-champagne/30 px-3 py-2 text-xs text-ivory"
                  />
                </div>

                {/* English */}
                <div className="p-4 border border-champagne/20 bg-obsidian/60 space-y-3">
                  <span className="text-xs font-semibold text-champagne uppercase">
                    English (EN)
                  </span>
                  <input
                    type="text"
                    placeholder="Fragrance Name (EN)"
                    value={editingProduct.nameEn}
                    onChange={(e) =>
                      setEditingProduct((p) => ({
                        ...p,
                        nameEn: e.target.value,
                      }))
                    }
                    className="w-full bg-obsidian border border-champagne/30 px-3 py-2 text-xs text-ivory"
                  />
                  <input
                    type="text"
                    placeholder="Notes Subtitle (EN)"
                    value={editingProduct.subtitleEn}
                    onChange={(e) =>
                      setEditingProduct((p) => ({
                        ...p,
                        subtitleEn: e.target.value,
                      }))
                    }
                    className="w-full bg-obsidian border border-champagne/30 px-3 py-2 text-xs text-ivory"
                  />
                  <textarea
                    rows={3}
                    placeholder="Full Description (EN)"
                    value={editingProduct.descriptionEn}
                    onChange={(e) =>
                      setEditingProduct((p) => ({
                        ...p,
                        descriptionEn: e.target.value,
                      }))
                    }
                    className="w-full bg-obsidian border border-champagne/30 px-3 py-2 text-xs text-ivory"
                  />
                </div>
              </div>
            </div>

            {/* Volumes, Pricing & Availability Management */}
            <div className="space-y-4 pt-4 border-t border-champagne/20">
              <div className="flex items-center justify-between">
                <h3 className="text-xs uppercase tracking-editorial text-champagne">
                  Управление объёмами, ценами (₸) и наличием
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    setEditingProduct((prev) => ({
                      ...prev,
                      volumes: [
                        ...prev.volumes,
                        {
                          volumeMl: 100,
                          priceKzt: 145000,
                          inStock: true,
                          sku: `INH-${Date.now().toString().slice(-3)}`,
                        },
                      ],
                    }))
                  }
                  className="px-3 py-1.5 border border-champagne/35 text-xs text-champagne hover:text-ivory"
                >
                  + Добавить объём
                </button>
              </div>

              <div className="space-y-3">
                {editingProduct.volumes.map((vol, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 border border-champagne/20 bg-obsidian/50 items-center"
                  >
                    <div>
                      <label className="block text-[10px] text-champagne uppercase">
                        Объём (мл)
                      </label>
                      <input
                        type="number"
                        value={vol.volumeMl}
                        onChange={(e) => {
                          const next = [...editingProduct.volumes];
                          next[idx] = {
                            ...next[idx],
                            volumeMl: Number(e.target.value),
                          };
                          setEditingProduct((p) => ({ ...p, volumes: next }));
                        }}
                        className="w-full bg-obsidian border border-champagne/30 px-2.5 py-1.5 text-xs text-ivory"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-champagne uppercase">
                        Цена (KZT ₸)
                      </label>
                      <input
                        type="number"
                        value={vol.priceKzt}
                        onChange={(e) => {
                          const next = [...editingProduct.volumes];
                          next[idx] = {
                            ...next[idx],
                            priceKzt: Number(e.target.value),
                          };
                          setEditingProduct((p) => ({ ...p, volumes: next }));
                        }}
                        className="w-full bg-obsidian border border-champagne/30 px-2.5 py-1.5 text-xs text-ivory"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-champagne uppercase">
                        SKU артикул
                      </label>
                      <input
                        type="text"
                        value={vol.sku}
                        onChange={(e) => {
                          const next = [...editingProduct.volumes];
                          next[idx] = { ...next[idx], sku: e.target.value };
                          setEditingProduct((p) => ({ ...p, volumes: next }));
                        }}
                        className="w-full bg-obsidian border border-champagne/30 px-2.5 py-1.5 text-xs text-ivory"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-3">
                      <label className="flex items-center gap-2 text-xs text-ivory cursor-pointer">
                        <input
                          type="checkbox"
                          checked={vol.inStock}
                          onChange={(e) => {
                            const next = [...editingProduct.volumes];
                            next[idx] = {
                              ...next[idx],
                              inStock: e.target.checked,
                            };
                            setEditingProduct((p) => ({ ...p, volumes: next }));
                          }}
                        />
                        <span>В наличии</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Upload & Gallery Management */}
            <div className="space-y-3 pt-4 border-t border-champagne/20">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-editorial text-champagne">
                  Изображения товара (Supabase Storage: perfume-images)
                </span>
                <label className="px-3 py-1.5 border border-champagne/35 text-xs text-ivory hover:border-champagne cursor-pointer inline-flex items-center gap-1.5">
                  <ImagePlus className="w-3.5 h-3.5 text-champagne" />
                  <span>Загрузить файл</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadImage}
                    disabled={!authStatus.isAdmin}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-ivory/75">
                {editingProduct.images.map((img, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-obsidian border border-champagne/25"
                  >
                    {img}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-champagne/20 flex items-center justify-between">
              <div className="flex items-center gap-6 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.inStock}
                    onChange={(e) =>
                      setEditingProduct((p) => ({
                        ...p,
                        inStock: e.target.checked,
                      }))
                    }
                  />
                  <span>Доступен в каталоге</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.featured}
                    onChange={(e) =>
                      setEditingProduct((p) => ({
                        ...p,
                        featured: e.target.checked,
                      }))
                    }
                  />
                  <span>Избранный на главной</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={!authStatus.isAdmin || saving}
                className="px-8 py-3.5 bg-burgundy hover:bg-burgundy-light disabled:opacity-40 text-white text-xs uppercase tracking-editorial"
              >
                {saving ? 'Сохранение...' : 'Сохранить изменения в Supabase'}
              </button>
            </div>
          </form>
        )}

        {/* TAB 4: CATEGORIES MANAGEMENT */}
        {activeTab === 'categories' && (
          <div className="p-6 sm:p-8 border border-champagne/25 bg-[#1A1817] space-y-6">
            <h2 className="font-serif text-2xl text-ivory">
              Управление категориями каталога
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CATEGORY_LIST.map((cat) => (
                <div
                  key={cat}
                  className="p-4 border border-champagne/25 bg-obsidian space-y-2"
                >
                  <span className="text-[10px] uppercase tracking-editorial text-champagne">
                    Slug: {cat}
                  </span>
                  <p className="font-serif text-xl text-ivory">{cat}</p>
                  <p className="text-xs text-ivory/60">
                    Товаров в категории:{' '}
                    {products.filter((p) => p.category === cat).length}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ORDERS & STATUS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="p-6 sm:p-8 border border-champagne/25 bg-[#1A1817] space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl text-ivory">
                Журнал заказов и изменение статусов
              </h2>
              <p className="text-xs text-ivory/65">
                Заявки, зарегистрированные через API оформления заказа в таблице{' '}
                <code>public.orders</code>
              </p>
            </div>

            {orders.length === 0 ? (
              <div className="p-8 border border-champagne/15 bg-obsidian text-center text-sm text-ivory/65">
                {authStatus.isAdmin
                  ? 'Зарегистрированных заказов в базе данных пока нет.'
                  : 'Для просмотра и изменения статусов заказов покупателей требуется серверная авторизация администратора в Supabase.'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-champagne/25 text-[11px] uppercase tracking-wider text-champagne">
                      <th className="p-3">№ Заказа</th>
                      <th className="p-3">Клиент / Телефон</th>
                      <th className="p-3">Город</th>
                      <th className="p-3">Сумма</th>
                      <th className="p-3">Статус</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-champagne/15">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="p-3 font-medium text-champagne">
                          {order.orderNumber}
                        </td>
                        <td className="p-3">
                          <p className="text-ivory">{order.customerName}</p>
                          <p className="text-xs text-ivory/60">
                            {order.customerPhone}
                          </p>
                        </td>
                        <td className="p-3 text-ivory/80">
                          {order.customerCity}
                        </td>
                        <td className="p-3 font-serif text-base text-ivory">
                          {formatPriceKzt(order.totalAmountKzt, 'ru')}
                        </td>
                        <td className="p-3">
                          <select
                            value={order.status}
                            disabled={!authStatus.isAdmin}
                            onChange={(e) =>
                              handleOrderStatusChange(
                                order.id,
                                e.target.value as OrderStatus
                              )
                            }
                            className="bg-obsidian border border-champagne/35 px-2.5 py-1.5 text-xs text-ivory"
                          >
                            <option value="pending_whatsapp">
                              pending_whatsapp
                            </option>
                            <option value="confirmed">confirmed</option>
                            <option value="in_progress">in_progress</option>
                            <option value="completed">completed</option>
                            <option value="cancelled">cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
