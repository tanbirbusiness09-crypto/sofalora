/**
 * Home page section registry.
 *
 * Keys must match the admin Website Builder "sofalora" profile
 * (ecommerce-admin-v2/public/admin/sofalora-profile.js). The order and
 * `active` flags here are the built-in defaults used when the admin has not
 * saved a homeSections config (or a key is missing from it).
 */
export const HOME_SECTION_DEFAULTS: ReadonlyArray<{ key: string; active: boolean; order?: number }> = [
  // Single-line category row directly under the header (first by default).
  { key: 'category_rows', active: true, order: 0.5 },
  { key: 'quick_category_bar', active: true, order: 1 },
  // noon-style promo grid directly above the hero.
  { key: 'promo_grid', active: true, order: 1.5 },
  { key: 'hero', active: true, order: 2 },
  // Redesign sections; fractional default order keeps them right after the hero
  // even when the admin has saved numbered orders for the older sections.
  { key: 'feature_strip', active: false, order: 2.1 },
  // noon-style rows after the feature strip.
  { key: 'price_bands', active: true, order: 2.15 },
  { key: 'deals_row', active: true, order: 2.17 },
  { key: 'category_grid', active: true, order: 2.2 },
  { key: 'new_arrivals', active: true, order: 2.3 },
  { key: 'promo_slider', active: true },
  { key: 'editorial_sofas', active: false },
  { key: 'editorial_curtains', active: false },
  { key: 'promo_banner', active: false },
  { key: 'editorial_pairings', active: false },
  { key: 'shop_by_room', active: true },
  { key: 'inspiration_gallery', active: true },
  { key: 'consultation_cta', active: false },
  { key: 'newsletter', active: true },
  // Available but hidden by default; switch on in the admin builder.
  { key: 'editorial_atelier', active: false },
  { key: 'best_sellers', active: false },
  { key: 'shop_by_category', active: false },
  { key: 'featured_collection', active: false },
  { key: 'curated_collection', active: false },
  { key: 'customer_reviews', active: false },
  { key: 'custom_curtain_service', active: false },
  { key: 'promotional_offer', active: false },
  { key: 'why_us', active: false },
];

export interface CmsLayoutEntry {
  key: string;
  active?: boolean;
  order?: number;
}

/** Visible section keys in display order, merging the CMS config over the defaults. */
export function resolveHomeLayout(cms: ReadonlyArray<CmsLayoutEntry>): string[] {
  const byKey = new Map(cms.map((s) => [s.key, s]));
  return HOME_SECTION_DEFAULTS.map((d, index) => {
    const saved = byKey.get(d.key);
    const order = saved && Number.isFinite(Number(saved.order)) ? Number(saved.order) : d.order ?? index + 1;
    const active = saved ? saved.active !== false : d.active;
    return { key: d.key, active, order, index };
  })
    .filter((s) => s.active)
    .sort((a, b) => a.order - b.order || a.index - b.index)
    .map((s) => s.key);
}
