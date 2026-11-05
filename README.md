# INHYPE Perfume Atelier — Digital Commerce & Olfactory Discovery Platform

Официальное веб-приложение парфюмерного пространства **INHYPE Perfume Atelier** (Казахстан · Астана и Актобе), разработанное в эстетике **Modern Luxury Editorial**.

---

## 1. Архитектура и возможности

- **Modern Luxury Editorial Design System**:
  - Цветовая палитра: Deep Black (`#171615`), Warm Ivory (`#EDE5D9`), Burgundy (`#632F39`), Champagne (`#B7A58D`), White (`#FFFFFF`).
  - Типографика: `Cormorant Garamond` для редакционных заголовков и `Inter` для основного текста и навигации.
- **Системная локализация (RU / KZ / EN)**:
  - Маршрутизация `/[locale]` (`/ru`, `/kz`, `/en`) с сохранением текущей страницы при переключении языка, локализованными метаданными, `canonical` и `hreflang`.
- **Каталог и карточки ароматов (`/[locale]/catalog`, `/[locale]/catalog/[slug]`)**:
  - Поиск по названию и бренду, фильтрация по дому/бренду, категории, ольфакторному направлению и наличию, сортировка по цене и алфавиту, сброс фильтров.
  - Детальная страница с галереей, выбором объёма, пересчётом цены, ольфакторной пирамидой (верхние, средние и базовые ноты), заметкой куратора и рекомендациями близких по звучанию композиций.
- **Интерактивный подбор аромата (`/[locale]/discovery`)**:
  - Пошаговый опрос (5 шагов с индикатором прогресса) и детерминированный алгоритм сопоставления ответов с реальными характеристиками каталога (`matchFragrancesToAnswers`).
- **Корзина, Избранное и заказ через WhatsApp (`/[locale]/cart`, `/[locale]/checkout`, `/[locale]/favorites`)**:
  - Полное управление позициями, объёмами и количеством с сохранением в `localStorage`.
  - Валидация контактных данных, защита от повторной отправки и формирование структурированной карточки заказа для консультанта в WhatsApp (открытие мессенджера происходит только по явному действию пользователя).
- **Административная панель (`/admin`) и интеграция с Supabase**:
  - Серверная проверка прав администратора (`verifyServerAdminAccess`).
  - Защищённые API-маршруты (`/api/admin/products`, `/api/admin/orders`, `/api/admin/upload`).
  - SQL-миграция (`supabase/migrations/001_initial_schema.sql`) с таблицами и политиками Row Level Security (RLS).

---

## 2. Необходимые переменные окружения

Скопируйте `.env.example` в `.env.local` и заполните значения перед production-запуском:

```env
NEXT_PUBLIC_SITE_URL=https://inhype-atelier.kz
NEXT_PUBLIC_WHATSAPP_NUMBER=77001234567
NEXT_PUBLIC_INSTAGRAM_HANDLE=@inhype_perfume
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/inhype_perfume/

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-secret-key
ADMIN_ALLOWED_EMAILS=admin@inhype.kz
```

> **Безопасность**: `SUPABASE_SERVICE_ROLE_KEY` и `ADMIN_ALLOWED_EMAILS` используются исключительно на серверной стороне и никогда не передаются в клиентский бандл.

---

## 3. Локальный запуск и проверка

```bash
# 1. Установка зависимостей
npm install

# 2. Проверка типов TypeScript
npm run typecheck

# 3. Сборка production-версии
npm run build

# 4. Запуск сервера разработки
npm run dev
```

После запуска откройте `http://localhost:3000` (выполняется переход на `/ru`).

---

## 4. Подготовка к деплою на Vercel

1. Импортируйте репозиторий проекта в **Vercel**.
2. В разделе **Project Settings → Environment Variables** задайте переменные из `.env.example`.
3. В **Supabase SQL Editor** выполните скрипт `supabase/migrations/001_initial_schema.sql`.
4. Перед публичным открытием сайта замените демонстрационные данные филиалов (`src/data/boutiques.ts`) и каталога на утверждённые данные компании.
