export type Locale = 'ru' | 'kz' | 'en';

export type LocalizedString = {
  ru: string;
  kz: string;
  en: string;
};

export type ScentFamily =
  | 'woody'
  | 'oriental'
  | 'floral'
  | 'fresh'
  | 'leather'
  | 'gourmand'
  | 'musky';

export type FragranceCategory =
  | 'extrait'
  | 'eau-de-parfum'
  | 'atelier-edition'
  | 'discovery-set';

export type ScentCharacter =
  | 'intimate'
  | 'enveloping'
  | 'architectural'
  | 'luminous'
  | 'mysterious';

export type ScentIntensity = 'delicate' | 'moderate' | 'expressive' | 'intense';

export type ScentOccasion =
  | 'daily-signature'
  | 'evening-soiree'
  | 'warm-season'
  | 'cold-season';

export interface ProductVolume {
  volumeMl: number;
  priceKzt: number;
  inStock: boolean;
  sku: string;
}

export interface OlfactoryPyramid {
  top: LocalizedString[];
  heart: LocalizedString[];
  base: LocalizedString[];
}

export interface PerfumeProduct {
  id: string;
  slug: string;
  brand: string;
  name: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  editorialNote?: LocalizedString;
  category: FragranceCategory;
  scentFamilies: ScentFamily[];
  character: ScentCharacter[];
  intensity: ScentIntensity;
  occasions: ScentOccasion[];
  concentration?: string;
  olfactoryPyramid?: OlfactoryPyramid;
  volumes: ProductVolume[];
  images: string[];
  featured: boolean;
  inStock: boolean;
  isDemoData: boolean;
  createdAt: string;
}

export interface BoutiqueLocation {
  id: string;
  city: LocalizedString;
  title: LocalizedString;
  address: LocalizedString;
  hours: LocalizedString;
  phone: string;
  statusNote: LocalizedString;
  image: string;
  isConfirmed: boolean;
}

export interface CartItem {
  productId: string;
  slug: string;
  brand: string;
  name: LocalizedString;
  image: string;
  volumeMl: number;
  priceKzt: number;
  quantity: number;
}

export interface OrderCustomerInput {
  fullName: string;
  phone: string;
  city: string;
  comment: string;
}

export type OrderStatus =
  | 'pending_whatsapp'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface OrderRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  comment?: string;
  items: CartItem[];
  totalAmountKzt: number;
  locale: Locale;
  status: OrderStatus;
  createdAt: string;
}

export interface DiscoveryAnswers {
  character?: ScentCharacter;
  families: ScentFamily[];
  intensity?: ScentIntensity;
  occasion?: ScentOccasion;
  budgetRange?: 'under-80k' | '80k-140k' | 'above-140k' | 'any';
}

export interface DiscoveryMatchResult {
  product: PerfumeProduct;
  score: number;
  matchPercentage: number;
  matchedReasons: LocalizedString[];
}
