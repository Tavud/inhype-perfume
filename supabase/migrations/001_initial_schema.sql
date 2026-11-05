-- ============================================================================
-- INHYPE PERFUME ATELIER — SUPABASE INITIAL DATABASE SCHEMA & RLS POLICIES
-- ============================================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- 1. ADMINISTRATORS TABLE
create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  role text not null default 'admin' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create policy "Admins can view their own admin record"
  on public.admin_users
  for select
  to authenticated
  using (auth.uid() = id);

-- Helper function to verify server/RLS admin status
create or replace function public.is_atelier_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1
    from public.admin_users
    where id = auth.uid()
  );
$$;

-- 2. CATEGORIES TABLE
create table if not exists public.categories (
  slug text primary key,
  name_ru text not null,
  name_kz text not null,
  name_en text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;

create policy "Categories are publicly readable"
  on public.categories
  for select
  to anon, authenticated
  using (true);

create policy "Only admins can mutate categories"
  on public.categories
  for all
  to authenticated
  using (public.is_atelier_admin())
  with check (public.is_atelier_admin());

-- 3. PRODUCTS TABLE (Multilingual RU / KZ / EN + Olfactory Profile)
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  brand text not null,
  name_ru text not null,
  name_kz text not null,
  name_en text not null,
  subtitle_ru text not null default '',
  subtitle_kz text not null default '',
  subtitle_en text not null default '',
  description_ru text not null default '',
  description_kz text not null default '',
  description_en text not null default '',
  editorial_note_ru text,
  editorial_note_kz text,
  editorial_note_en text,
  category text not null references public.categories(slug) on update cascade,
  scent_families text[] not null default '{}',
  character_traits text[] not null default '{}',
  intensity text not null default 'moderate' check (intensity in ('delicate', 'moderate', 'expressive', 'intense')),
  occasions text[] not null default '{}',
  concentration text,
  olfactory_pyramid jsonb,
  images text[] not null default '{}',
  featured boolean not null default false,
  in_stock boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "Products are publicly readable"
  on public.products
  for select
  to anon, authenticated
  using (true);

create policy "Only admins can insert/update/delete products"
  on public.products
  for all
  to authenticated
  using (public.is_atelier_admin())
  with check (public.is_atelier_admin());

-- 4. PRODUCT VOLUMES & PRICING TABLE
create table if not exists public.product_volumes (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  volume_ml int not null check (volume_ml > 0),
  price_kzt numeric(12, 0) not null check (price_kzt >= 0),
  in_stock boolean not null default true,
  sku text not null,
  unique (product_id, volume_ml)
);

alter table public.product_volumes enable row level security;

create policy "Product volumes are publicly readable"
  on public.product_volumes
  for select
  to anon, authenticated
  using (true);

create policy "Only admins can mutate product volumes"
  on public.product_volumes
  for all
  to authenticated
  using (public.is_atelier_admin())
  with check (public.is_atelier_admin());

-- 5. ORDERS TABLE (Server-registered WhatsApp & Concierge requests)
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  customer_name text not null,
  customer_phone text not null,
  customer_city text not null,
  comment text,
  items jsonb not null default '[]'::jsonb,
  total_amount_kzt numeric(12, 0) not null check (total_amount_kzt >= 0),
  locale text not null default 'ru',
  status text not null default 'pending_whatsapp' check (
    status in ('pending_whatsapp', 'confirmed', 'in_progress', 'completed', 'cancelled')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Only admins can read or update orders"
  on public.orders
  for all
  to authenticated
  using (public.is_atelier_admin())
  with check (public.is_atelier_admin());

-- 6. STORAGE BUCKET FOR PRODUCT PHOTOGRAPHY
insert into storage.buckets (id, name, public)
values ('perfume-images', 'perfume-images', true)
on conflict (id) do nothing;

create policy "Public read access for perfume images"
  on storage.objects
  for select
  to public
  using (bucket_id = 'perfume-images');

create policy "Only admins can upload or delete perfume images"
  on storage.objects
  for all
  to authenticated
  using (bucket_id = 'perfume-images' and public.is_atelier_admin())
  with check (bucket_id = 'perfume-images' and public.is_atelier_admin());
