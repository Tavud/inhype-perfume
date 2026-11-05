import { formatPriceKzt } from '@/i18n/config';
import { getLocalizedText } from '@/data/catalog';
import { CartItem, Locale, OrderCustomerInput } from '@/types/perfume';
import { siteConfig } from './config';

export interface ValidationErrors {
  fullName?: string;
  phone?: string;
  city?: string;
  cart?: string;
}

export function validateCheckoutInput(
  input: OrderCustomerInput,
  cart: CartItem[],
  messages: {
    nameRequired: string;
    phoneInvalid: string;
    cityRequired: string;
    cartEmpty: string;
  }
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = messages.nameRequired;
  }

  const digitsOnly = input.phone.replace(/[^\d]/g, '');
  if (!digitsOnly || digitsOnly.length < 10 || digitsOnly.length > 15) {
    errors.phone = messages.phoneInvalid;
  }

  if (!input.city || input.city.trim().length < 2) {
    errors.city = messages.cityRequired;
  }

  if (!cart || cart.length === 0) {
    errors.cart = messages.cartEmpty;
  }

  return errors;
}

export function buildWhatsAppOrderMessage(
  customer: OrderCustomerInput,
  cart: CartItem[],
  totalAmountKzt: number,
  locale: Locale,
  referenceCode: string
): string {
  const headerByLocale: Record<Locale, string> = {
    ru: `Здравствуйте, INHYPE Perfume Atelier!\nХочу оформить заказ / уточнить наличие (Заявка #${referenceCode}):`,
    kz: `Сәлеметсіз бе, INHYPE Perfume Atelier!\nТапсырыс бергім келеді / қолжетімділігін нақтылау (Өтінім #${referenceCode}):`,
    en: `Hello, INHYPE Perfume Atelier!\nI would like to place an order / inquire about availability (Request #${referenceCode}):`,
  };

  const lines: string[] = [headerByLocale[locale], ''];

  cart.forEach((item, index) => {
    const lineTotal = item.priceKzt * item.quantity;
    const productName = getLocalizedText(item.name, locale);
    lines.push(
      `${index + 1}. ${item.brand.replace(' · DEMO', '')} — ${productName} (${item.volumeMl} ml) × ${item.quantity} = ${formatPriceKzt(lineTotal, locale)}`
    );
  });

  lines.push('');

  if (locale === 'kz') {
    lines.push(`Жалпы сомасы: ${formatPriceKzt(totalAmountKzt, locale)}`);
    lines.push('');
    lines.push(`Аты-жөні: ${customer.fullName.trim()}`);
    lines.push(`Телефон: ${customer.phone.trim()}`);
    lines.push(`Қала: ${customer.city.trim()}`);
    if (customer.comment.trim()) {
      lines.push(`Түсініктеме: ${customer.comment.trim()}`);
    }
  } else if (locale === 'en') {
    lines.push(`Estimated Total: ${formatPriceKzt(totalAmountKzt, locale)}`);
    lines.push('');
    lines.push(`Client Name: ${customer.fullName.trim()}`);
    lines.push(`Phone: ${customer.phone.trim()}`);
    lines.push(`City: ${customer.city.trim()}`);
    if (customer.comment.trim()) {
      lines.push(`Notes: ${customer.comment.trim()}`);
    }
  } else {
    lines.push(`Итоговая сумма: ${formatPriceKzt(totalAmountKzt, locale)}`);
    lines.push('');
    lines.push(`Имя: ${customer.fullName.trim()}`);
    lines.push(`Телефон: ${customer.phone.trim()}`);
    lines.push(`Город: ${customer.city.trim()}`);
    if (customer.comment.trim()) {
      lines.push(`Комментарий: ${customer.comment.trim()}`);
    }
  }

  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string): string | null {
  const cleanPhone = siteConfig.whatsappNumber;
  if (!cleanPhone || cleanPhone.length < 10) {
    return null;
  }
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
