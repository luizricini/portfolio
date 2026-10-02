'use client';

import { useEffect } from 'react';

/**
 * Draws each graph row as it scrolls into view. Without JS, or with reduced
 * motion, the graph is simply fully drawn.
 */
export function GraphMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const rows = Array.from(document.querySelectorAll<HTMLElement>('[data-row]'));
    const root = document.documentElement;
    root.classList.add('graph-motion');

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute('data-drawn', '');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );

    for (const row of rows) {
      const box = row.getBoundingClientRect();
      if (box.top < window.innerHeight) row.setAttribute('data-drawn', '');
      else io.observe(row);
    }

    const nav = document.querySelector('.topbar');
    const onScroll = () => nav?.toggleAttribute('data-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return null;
}
