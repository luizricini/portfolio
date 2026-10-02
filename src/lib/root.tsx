import type { Metadata, Viewport } from 'next';
import { Archivo, Martian_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import { dictionaries, type Locale } from '@/content';
import '../app/globals.css';

const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-sans', display: 'swap' });
const mono = Martian_Mono({ subsets: ['latin'], axes: ['wdth'], variable: '--font-mono', display: 'swap' });

const SITE = 'https://www.ricini.dev';

export function buildMetadata(locale: Locale): Metadata {
  const t = dictionaries[locale];
  const url = locale === 'pt' ? `${SITE}/pt/` : `${SITE}/`;
  return {
    metadataBase: new URL(SITE),
    title: t.meta.title,
    description: t.meta.description,
    alternates: { canonical: url, languages: { en: `${SITE}/`, 'pt-BR': `${SITE}/pt/` } },
    openGraph: {
      type: 'profile',
      url,
      title: t.meta.title,
      description: t.meta.description,
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      siteName: 'ricini.dev',
    },
    twitter: { card: 'summary', title: t.meta.title, description: t.meta.description },
  };
}

export const viewport: Viewport = { themeColor: '#F4F5F7', colorScheme: 'light' };

export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale === 'pt' ? 'pt-BR' : 'en'} className={`${archivo.variable} ${mono.variable}`}>
      <body id="top">{children}</body>
    </html>
  );
}
