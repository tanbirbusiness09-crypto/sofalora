/**
 * Website CMS content from the admin (GET /api/v1/storefront/website).
 *
 * The admin "Website & Banner Builder" stores homeSections (key/active/order +
 * text, items), banners (promo slider), pageBanners (cards) and brandConfig.
 * Everything here is optional: when the API is down or the config is empty,
 * components fall back to their built-in Sofalora defaults.
 */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  absoluteMediaUrl,
  fetchWebsiteContent,
  isCommerceApiConfigured,
  type CmsBanner,
  type CmsBrandConfig,
  type CmsCard,
  type CmsItem,
  type CmsSection,
  type WebsiteContent,
} from '../lib/api';
import { useShop } from './LanguageContext';

type WebsiteStatus = 'loading' | 'ready' | 'error';

interface WebsiteContextValue {
  status: WebsiteStatus;
  content: WebsiteContent;
  section: (key: string) => CmsSection | undefined;
  card: (key: string) => CmsCard | undefined;
  /** Active promo-slider banners with an image. */
  banners: CmsBanner[];
  brand: CmsBrandConfig;
}

const EMPTY: WebsiteContent = { banners: [], pageBanners: {}, homeSections: [], brandConfig: {} };

const WebsiteContext = createContext<WebsiteContextValue | null>(null);

export const WebsiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<WebsiteContent>(EMPTY);
  const [status, setStatus] = useState<WebsiteStatus>(isCommerceApiConfigured ? 'loading' : 'ready');

  useEffect(() => {
    if (!isCommerceApiConfigured) return;
    const ctrl = new AbortController();
    fetchWebsiteContent(ctrl.signal)
      .then((data) => {
        setContent(data);
        setStatus('ready');
      })
      .catch((err) => {
        if ((err as Error)?.name === 'AbortError') return;
        console.warn('[website] CMS content unavailable, using defaults:', err);
        setStatus('error');
      });
    return () => ctrl.abort();
  }, []);

  const value = useMemo<WebsiteContextValue>(() => {
    const byKey = new Map(content.homeSections.map((s) => [s.key, s]));
    return {
      status,
      content,
      section: (key) => byKey.get(key),
      card: (key) => content.pageBanners[key],
      banners: content.banners.filter((b) => b && b.active !== false && (b.image || '').trim() !== ''),
      brand: content.brandConfig,
    };
  }, [content, status]);

  return <WebsiteContext.Provider value={value}>{children}</WebsiteContext.Provider>;
};

export const useWebsite = (): WebsiteContextValue => {
  const ctx = useContext(WebsiteContext);
  if (!ctx) {
    return {
      status: 'ready',
      content: EMPTY,
      section: () => undefined,
      card: () => undefined,
      banners: [],
      brand: {},
    };
  }
  return ctx;
};

/** Pick the current-language value, falling back to the other language, then to `fallback`. */
export function pickText(
  language: string,
  en: string | undefined | null,
  ar: string | undefined | null,
  fallback = ''
): string {
  const e = (en ?? '').trim();
  const a = (ar ?? '').trim();
  if (language === 'ar') return a || e || fallback;
  return e || a || fallback;
}

export const cmsImage = (url: string | undefined | null, fallback = ''): string =>
  (url ?? '').trim() ? absoluteMediaUrl((url as string).trim()) : fallback;

// ---------------------------------------------------------------------------
// Per-section access (HomePage wraps each section in <CmsSectionScope>)
// ---------------------------------------------------------------------------

const SectionKeyContext = createContext<string | null>(null);

export const CmsSectionScope: React.FC<{ sectionKey: string; children: React.ReactNode }> = ({
  sectionKey,
  children,
}) => <SectionKeyContext.Provider value={sectionKey}>{children}</SectionKeyContext.Provider>;

export interface SectionCms {
  key: string | null;
  section?: CmsSection;
  /** CMS title for this section, or `fallback`. */
  title: (fallback: string) => string;
  subtitle: (fallback: string) => string;
  /** Item i merged over the default item (admin saves sparse item arrays). */
  item: (index: number) => CmsItem;
}

/** CMS overrides for the section this component is rendered in (if any). */
export function useSectionCms(explicitKey?: string): SectionCms {
  const scopeKey = useContext(SectionKeyContext);
  const key = explicitKey ?? scopeKey;
  const { section } = useWebsite();
  const { language } = useShop();
  const s = key ? section(key) : undefined;
  return {
    key,
    section: s,
    title: (fallback) => pickText(language, s?.title_en, s?.title_ar, fallback),
    subtitle: (fallback) => pickText(language, s?.subtitle_en, s?.subtitle_ar, fallback),
    item: (index) => (s?.items && s.items[index]) || {},
  };
}
