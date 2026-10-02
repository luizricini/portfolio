import type { ReactNode } from 'react';
import { buildMetadata, RootShell } from '@/lib/root';

export { viewport } from '@/lib/root';
export const metadata = buildMetadata('en');

export default function Layout({ children }: { children: ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
