import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Category, Product } from '../types';
import {
  ApiCategory,
  buildCategoryParentIndex,
  fetchAllProducts,
  fetchCategories,
  fetchProductBySlug,
  mapApiCategories,
  mapApiProduct,
} from '../lib/api';
import { useShop } from './LanguageContext';

export type CatalogStatus = 'loading' | 'ready' | 'error';

interface CatalogContextValue {
  status: CatalogStatus;
  isLoading: boolean;
  error: string | null;
  products: Product[];
  /** Flattened category list (parents followed by their children). */
  categories: Category[];
  /** Raw category tree from the admin API. */
  categoryTree: ApiCategory[];
  /** Products in a category, including its sub-categories. */
  productsInCategory: (slug: string) => Product[];
  /** Child categories of a top-level category, as hero pills. */
  subcategoriesOf: (slug: string) => { slug: string; name: { en: string; ar: string } }[];
  findProduct: (idOrSlug: string) => Product | undefined;
  reload: () => void;
}

const CatalogContext = createContext<CatalogContextValue | undefined>(undefined);

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<CatalogStatus>('loading');
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryTree, setCategoryTree] = useState<ApiCategory[]>([]);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');
    setError(null);

    Promise.all([fetchCategories(controller.signal), fetchAllProducts(controller.signal)])
      .then(([tree, apiProducts]) => {
        const parents = buildCategoryParentIndex(tree);
        setCategoryTree(tree);
        setProducts(apiProducts.map((p) => mapApiProduct(p, parents)));
        setStatus('ready');
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        console.error('[catalog] failed to load', err);
        setError(err instanceof Error ? err.message : 'Failed to load catalog');
        setStatus('error');
      });

    return () => controller.abort();
  }, [reloadKey]);

  const categories = useMemo(() => mapApiCategories(categoryTree), [categoryTree]);

  // Drop wishlist ids (e.g. deleted test products) that are no longer in the
  // live catalog. Only runs after a successful non-empty load.
  const { wishlist, removeFromWishlist } = useShop();
  useEffect(() => {
    if (status !== 'ready' || products.length === 0) return;
    const ids = new Set(products.flatMap((p) => [p.id, p.slug ?? p.id]));
    wishlist.filter((id) => !ids.has(id)).forEach((id) => removeFromWishlist(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, products, wishlist.join('|')]);

  const productsInCategory = useCallback(
    (slug: string) => {
      const node = categoryTree.find((c) => c.slug === slug);
      const slugs = new Set<string>([slug, ...(node?.children ?? []).map((c) => c.slug)]);
      return products.filter(
        (p) => slugs.has(p.categorySlug) || (p.subcategorySlug ? slugs.has(p.subcategorySlug) : false)
      );
    },
    [categoryTree, products]
  );

  const subcategoriesOf = useCallback(
    (slug: string) => {
      const node = categoryTree.find((c) => c.slug === slug);
      return (node?.children ?? []).map((c) => ({
        slug: c.slug,
        name: { en: c.name, ar: c.name_ar || c.name },
      }));
    },
    [categoryTree]
  );

  const findProduct = useCallback(
    (idOrSlug: string) => products.find((p) => p.slug === idOrSlug || p.id === idOrSlug),
    [products]
  );

  const value: CatalogContextValue = {
    status,
    isLoading: status === 'loading',
    error,
    products,
    categories,
    categoryTree,
    productsInCategory,
    subcategoriesOf,
    findProduct,
    reload: () => setReloadKey((k) => k + 1),
  };

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
};

export function useCatalog(): CatalogContextValue {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used inside <CatalogProvider>');
  return ctx;
}

/**
 * Resolve one product for the detail page: from the loaded catalog first,
 * otherwise straight from /storefront/products/{slug}.
 */
export function useCatalogProduct(idOrSlug: string | undefined): {
  product: Product | null;
  status: 'loading' | 'ready' | 'not-found' | 'error';
} {
  const { status, findProduct, categoryTree } = useCatalog();
  const fromCatalog = idOrSlug ? findProduct(idOrSlug) : undefined;
  const [fetched, setFetched] = useState<{ key: string; product: Product | null; failed: boolean } | null>(null);

  useEffect(() => {
    if (!idOrSlug || fromCatalog || status !== 'ready') return;
    if (fetched?.key === idOrSlug) return;
    const controller = new AbortController();
    fetchProductBySlug(idOrSlug, controller.signal)
      .then((p) =>
        setFetched({
          key: idOrSlug,
          product: p ? mapApiProduct(p, buildCategoryParentIndex(categoryTree)) : null,
          failed: false,
        })
      )
      .catch(() => {
        if (!controller.signal.aborted) setFetched({ key: idOrSlug, product: null, failed: true });
      });
    return () => controller.abort();
  }, [idOrSlug, fromCatalog, status, categoryTree, fetched?.key]);

  if (!idOrSlug) return { product: null, status: 'not-found' };
  if (fromCatalog) return { product: fromCatalog, status: 'ready' };
  if (status === 'loading') return { product: null, status: 'loading' };
  if (status === 'error') return { product: null, status: 'error' };
  if (fetched?.key !== idOrSlug) return { product: null, status: 'loading' };
  if (fetched.product) return { product: fetched.product, status: 'ready' };
  return { product: null, status: fetched.failed ? 'error' : 'not-found' };
}
