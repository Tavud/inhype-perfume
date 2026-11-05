import { Locale } from '@/types/perfume';

export const locales: Locale[] = ['ru', 'kz', 'en'];
export const defaultLocale: Locale = 'ru';

export const localeLabels: Record<Locale, string> = {
  ru: 'RU',
  kz: 'KZ',
  en: 'EN',
};

export const localeFullNames: Record<Locale, string> = {
  ru: 'Русский',
  kz: 'Қазақша',
  en: 'English',
};

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function formatPriceKzt(amount: number, locale: Locale = 'ru'): string {
  const formatted = new Intl.NumberFormat(
    locale === 'en' ? 'en-US' : 'ru-KZ',
    {
      maximumFractionDigits: 0,
    }
  ).format(amount);
  return `${formatted} ₸`;
}
