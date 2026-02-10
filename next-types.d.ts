// next-types.d.ts
import 'next';

declare module 'next' {
  export interface PageProps {
    params: Record<string, string | string[]>;
    searchParams?: Record<string, string | string[]>;
  }

  export interface LayoutProps {
    children?: React.ReactNode;
    params: Record<string, string | string[]>;
  }
}

// Global override for Next.js internal types
declare module 'next/dist/lib/metadata/types/metadata-interface' {
  export interface PageProps {
    params: Record<string, string | string[]>;
    searchParams?: Record<string, string | string[]>;
  }
}