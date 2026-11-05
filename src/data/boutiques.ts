import { BoutiqueLocation } from '@/types/perfume';

/**
 * Boutique locations for INHYPE Perfume Atelier in Kazakhstan (Astana & Aktobe).
 * Marked with `isConfirmed: false` until exact street addresses, phones, and hours
 * are formally verified by INHYPE management before public production launch.
 */
export const BOUTIQUE_LOCATIONS: BoutiqueLocation[] = [
  {
    id: 'boutique-astana',
    city: {
      ru: 'Астана',
      kz: 'Астана',
      en: 'Astana',
    },
    title: {
      ru: 'INHYPE Perfume Atelier · Астана',
      kz: 'INHYPE Perfume Atelier · Астана',
      en: 'INHYPE Perfume Atelier · Astana',
    },
    address: {
      ru: '[Демо-запись: точный адрес в г. Астана уточняется перед публикацией]',
      kz: '[Демо-жазба: Астана қаласындағы нақты мекенжай жариялау алдында нақтыланады]',
      en: '[Demo Entry: Exact street address in Astana pending confirmation before publication]',
    },
    hours: {
      ru: 'Ежедневно · График уточняется (предварительно 10:00 — 22:00)',
      kz: 'Күн сайын · Кесте нақтылануда (алдын ала 10:00 — 22:00)',
      en: 'Daily · Schedule pending confirmation (preview: 10:00 — 22:00)',
    },
    phone: 'Контакт уточняется · @inhype_perfume',
    statusNote: {
      ru: 'Парфюмерное пространство и индивидуальный подбор ароматов в столице',
      kz: 'Елордадағы парфюмерлік кеңістік және жеке хош иіс таңдау',
      en: 'Fragrance space and private olfactory consultations in the capital',
    },
    image: '/images/boutique-astana.svg',
    isConfirmed: false,
  },
  {
    id: 'boutique-aktobe',
    city: {
      ru: 'Актобе',
      kz: 'Ақтөбе',
      en: 'Aktobe',
    },
    title: {
      ru: 'INHYPE Perfume Atelier · Актобе',
      kz: 'INHYPE Perfume Atelier · Ақтөбе',
      en: 'INHYPE Perfume Atelier · Aktobe',
    },
    address: {
      ru: '[Демо-запись: точный адрес в г. Актобе уточняется перед публикацией]',
      kz: '[Демо-жазба: Ақтөбе қаласындағы нақты мекенжай жариялау алдында нақтыланады]',
      en: '[Demo Entry: Exact street address in Aktobe pending confirmation before publication]',
    },
    hours: {
      ru: 'Ежедневно · График уточняется (предварительно 10:00 — 21:00)',
      kz: 'Күн сайын · Кесте нақтылануда (алдын ала 10:00 — 21:00)',
      en: 'Daily · Schedule pending confirmation (preview: 10:00 — 21:00)',
    },
    phone: 'Контакт уточняется · @inhype_perfume',
    statusNote: {
      ru: 'Кураторская коллекция парфюмерии и дегустация ароматов',
      kz: 'Парфюмерияның кураторлық топтамасы және хош иістер дегустациясы',
      en: 'Curated fragrance collection and bespoke scent discovery',
    },
    image: '/images/boutique-aktobe.svg',
    isConfirmed: false,
  },
];
