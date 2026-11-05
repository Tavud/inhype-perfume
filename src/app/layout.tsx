import type { Metadata } from 'next';
import './globals.css';
import { AtelierStoreProvider } from '@/context/AtelierStoreContext';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: 'INHYPE Perfume Atelier — Парфюмерное пространство в Казахстане',
    template: '%s | INHYPE Perfume Atelier',
  },
  description:
    'Парфюмерное ателье INHYPE в Астане и Актобе. Подбор ароматов, кураторская коллекция парфюмерии и персональные консультации.',
  openGraph: {
    type: 'website',
    siteName: 'INHYPE Perfume Atelier',
    title: 'INHYPE Perfume Atelier',
    description:
      'У каждого аромата свой характер. У каждого человека — свой. Откройте аромат, который станет частью вашей индивидуальности.',
    images: ['/images/hero-campaign.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="bg-obsidian text-ivory">
      <body className="min-h-screen flex flex-col font-sans bg-obsidian text-ivory antialiased selection:bg-burgundy selection:text-white">
        <AtelierStoreProvider>{children}</AtelierStoreProvider>
      </body>
    </html>
  );
}
