'use client';

import { useEffect } from 'react';
import type { Locale } from '@/content';

const KEY = 'ricini.locale';

function remember(locale: Locale) {
  try {
    localStorage.setItem(KEY, locale);
  } catch {}
}

export function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  // First visit to the English root from a Portuguese browser goes to /pt/,
  // unless the visitor has already picked a language.
  useEffect(() => {
    if (locale !== 'en') return;
    try {
      if (localStorage.getItem(KEY)) return;
    } catch {
      return;
    }
    if (navigator.language?.toLowerCase().startsWith('pt')) {
      window.location.replace('/pt/' + window.location.hash);
    }
  }, [locale]);

  return (
    <div className="lang" role="group" aria-label={label}>
      <a href="/" hrefLang="en" aria-current={locale === 'en' ? 'true' : undefined} onClick={() => remember('en')}>
        EN
      </a>
      <a href="/pt/" hrefLang="pt-BR" aria-current={locale === 'pt' ? 'true' : undefined} onClick={() => remember('pt')}>
        PT
      </a>
    </div>
  );
}
