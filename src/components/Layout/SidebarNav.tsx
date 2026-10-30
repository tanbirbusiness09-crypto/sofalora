import React, { useEffect, useMemo, useState } from 'react';
import {
  Home,
  Sofa,
  LayoutPanelLeft,
  Armchair,
  Blinds,
  BedDouble,
  Layers,
  Scissors,
  Sparkles,
  Tag,
  MapPin,
  MessageSquareText,
  X,
  Heart,
  PackageCheck,
  User,
  ShoppingBag,
  Globe,
  PanelLeftClose,
  PanelLeftOpen,
  type LucideIcon,
} from 'lucide-react';
import { useShop } from '../../context/LanguageContext';
import { useAccountLink } from '../../context/AuthContext';
import { Link, useRouter } from '../../context/RouterContext';
import { useCatalog } from '../../context/CatalogContext';
import { useWebsite, pickText } from '../../context/WebsiteContext';
import { BrandLogo } from '../UI/BrandLogo';

interface NavChild {
  href: string;
  label: string;
}

interface NavEntry {
  key: string;
  href: string;
  label: string;
  icon: LucideIcon;
  children: NavChild[];
}

/**
 * Built-in navigation (the links of the previous horizontal nav + mega menu).
 * Admin API categories are merged in: matching slugs get the API name and
 * their sub-categories, unknown top-level categories are appended.
 */
const useNavEntries = (): NavEntry[] => {
  const { t, language } = useShop();
  const { categoryTree } = useCatalog();

  return useMemo(() => {
    const isAr = language === 'ar';
    const fallback: NavEntry[] = [
      { key: 'home', href: '/', label: t('navHome'), icon: Home, children: [] },
      {
        key: 'sofas',
        href: '/category/sofas',
        label: t('navSofas'),
        icon: Sofa,
        children: [],
      },
      { key: 'sectional-sofas', href: '/category/sectional-sofas', label: t('navSectionals'), icon: LayoutPanelLeft, children: [] },
      { key: 'majlis-sofas', href: '/category/majlis-sofas', label: t('navMajlis'), icon: Sofa, children: [] },
      {
        key: 'curtains',
        href: '/category/curtains',
        label: t('navCurtains'),
        icon: Blinds,
        children: [
          { href: '/category/blackout-curtains', label: t('navBlackout') },
          { href: '/category/sheer-curtains', label: t('navSheer') },
          { href: '/category/custom-curtains', label: t('navRoman') },
        ],
      },
      { key: 'armchairs', href: '/category/armchairs', label: t('navArmchairs'), icon: Armchair, children: [] },
      { key: 'sofa-beds', href: '/category/sofa-beds', label: t('navSofaBeds'), icon: BedDouble, children: [] },
      { key: 'pairings', href: '/shop', label: t('navPairings'), icon: Layers, children: [] },
      { key: 'custom-curtains', href: '/category/custom-curtains', label: t('navCustom'), icon: Scissors, children: [] },
      { key: 'new-arrivals', href: '/new-arrivals', label: t('navNewArrivals'), icon: Sparkles, children: [] },
      { key: 'offers', href: '/offers', label: t('navOffers'), icon: Tag, children: [] },
    ];

    const bySlug = new Map(fallback.map((e) => [e.key, e]));
    const extra: NavEntry[] = [];
    for (const cat of categoryTree) {
      const label = isAr ? cat.name_ar || cat.name : cat.name;
      const children = (cat.children ?? []).map((c) => ({
        href: `/category/${c.slug}`,
        label: isAr ? c.name_ar || c.name : c.name,
      }));
      const existing = bySlug.get(cat.slug);
      if (existing) {
        existing.label = label || existing.label;
        const known = new Set(existing.children.map((c) => c.href));
        existing.children = [...existing.children, ...children.filter((c) => !known.has(c.href))];
      }
      // Categories not in the fixed list are reachable from /shop; they are not added here.
    }
    // API-only categories go after the product categories, before the services.
    void extra;
    return fallback;
  }, [t, language, categoryTree]);
};

const isActive = (path: string, href: string) => {
  const p = path.toLowerCase().replace(/\/+$/, '') || '/';
  return href === '/' ? p === '/' : p === href || p.startsWith(`${href}/`);
};

interface NavListProps {
  onNavigate?: () => void;
  /** Desktop icon-only rail. */
  collapsed?: boolean;
  onToggle?: () => void;
}

/** Hover tooltip for the collapsed rail (opens toward the content side). */
const Tip: React.FC<{ text: string }> = ({ text }) => (
  <span className="pointer-events-none absolute start-full top-1/2 z-50 ms-3 -translate-y-1/2 whitespace-nowrap rounded-[6px] bg-[#0B2345] px-2.5 py-1.5 text-[12.5px] font-semibold text-white opacity-0 shadow-lg ring-1 ring-[#B59460]/30 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
    {text}
  </span>
);

const NavList: React.FC<NavListProps> = ({ onNavigate, collapsed = false, onToggle }) => {
  const { route } = useRouter();
  const { language, openConsultation } = useShop();
  const { brand } = useWebsite();
  const entries = useNavEntries();
  const isAr = language === 'ar';
  const [open, setOpen] = useState<string | null>(() => {
    const hit = entries.find((e) => e.children.some((c) => isActive(route.path, c.href)));
    return hit?.key ?? null;
  });

  const address = pickText(language, brand.addressEn, brand.addressAr);

  const itemBase =
    'group relative flex h-10 w-full items-center gap-3 rounded-[8px] px-3 text-[14px] font-semibold leading-none transition-colors duration-200';
  const ico = 'h-[18px] w-[18px] shrink-0 transition-[transform,color] duration-200 ease-out';
  const icoIdle = 'text-[#E8DCC6] group-hover:text-[#C9A96E] group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5';
  const label = 'px-3 pb-1.5 pt-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#B59460]/80 rtl:tracking-normal';
  const rail = collapsed ? ' justify-center !px-0 !gap-0' : '';
  const hideLabel = collapsed ? 'sr-only' : '';
  const idle = 'text-white/90 hover:bg-white/[0.07] hover:text-white';
  const active = 'bg-[rgba(181,148,96,0.15)] text-white before:absolute before:inset-y-2 before:start-0 before:w-[3px] before:rounded-full before:bg-[#B59460]';

  return (
    <nav aria-label={isAr ? 'التصنيفات' : 'Categories'} className="flex flex-col gap-1">
      <div className={`flex items-center ${collapsed ? 'justify-center pb-1' : 'justify-between pe-1'}`}>
        {!collapsed && <p className={label}>{isAr ? 'تسوق' : 'Shop'}</p>}
        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={!collapsed}
            aria-label={collapsed ? (isAr ? 'إظهار القائمة' : 'Expand sidebar') : isAr ? 'إخفاء القائمة' : 'Collapse sidebar'}
            title={collapsed ? (isAr ? 'إظهار القائمة' : 'Expand sidebar') : isAr ? 'إخفاء القائمة' : 'Collapse sidebar'}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-[#E8DCC6] transition-colors hover:border-[#B59460] hover:bg-[rgba(181,148,96,0.15)] hover:text-[#C9A96E]"
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4 rtl:-scale-x-100" /> : <PanelLeftClose className="h-4 w-4 rtl:-scale-x-100" />}
          </button>
        )}
      </div>
      {entries.map((e) => {
        const on = isActive(route.path, e.href);
        const Icon = e.icon;
        // Sub-categories open on hover/focus, or stay open when one is active. No chevron.
        const expanded = open === e.key || e.children.some((c) => isActive(route.path, c.href));
        return (
          <div
            key={e.key}
            className="relative"
            onMouseEnter={() => e.children.length > 0 && setOpen(e.key)}
            onMouseLeave={() => setOpen((o) => (o === e.key ? null : o))}
            onFocus={() => e.children.length > 0 && setOpen(e.key)}
          >
            <div className="relative flex items-center">
              <Link
                href={e.href}
                onClick={onNavigate}
                aria-current={on ? 'page' : undefined}
                aria-label={collapsed ? e.label : undefined}
                className={`${itemBase} flex-1 ${on ? active : idle}${rail}`}
              >
                <Icon strokeWidth={1.5} className={`${ico} ${on ? 'text-[#C9A96E]' : icoIdle}`} />
                <span className={`truncate ${hideLabel}`}>{e.label}</span>
                {collapsed && e.children.length === 0 && <Tip text={e.label} />}
              </Link>
            </div>
            {collapsed && e.children.length > 0 && open === e.key && (
              <div className="absolute start-full top-0 z-50 ps-3">
                <div className="sf-fade w-52 rounded-[10px] bg-[#0B2345] p-2 shadow-xl ring-1 ring-[#B59460]/30">
                  <Link href={e.href} onClick={onNavigate} className="block rounded-lg px-2.5 py-2 text-[13px] font-bold text-white hover:bg-white/[0.07]">
                    {e.label}
                  </Link>
                  {e.children.map((c) => (
                    <Link key={c.href} href={c.href} onClick={onNavigate} className={`block rounded-lg px-2.5 py-1.5 text-[12.5px] transition-colors hover:bg-white/[0.07] ${isActive(route.path, c.href) ? 'text-[#D9C29A] font-semibold' : 'text-white/70 hover:text-white'}`}>
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {!collapsed && e.children.length > 0 && (
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <ul className="ms-[26px] mt-1 mb-1.5 border-s border-white/10 ps-3 space-y-0.5">
                    {e.children.map((c) => {
                      const cOn = isActive(route.path, c.href);
                      return (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={onNavigate}
                            className={`block rounded-lg px-2.5 py-1.5 text-[12.5px] transition-colors ${
                              cOn ? 'text-[#D9C29A] font-semibold' : 'text-white/65 hover:text-white'
                            }`}
                          >
                            {c.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="my-2.5 mx-1 h-px bg-white/10" />
      {!collapsed && <p className={label}>{isAr ? 'المساعدة' : 'Help'}</p>}

      {address ? (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noreferrer"
          className={`${itemBase} text-white/80 hover:bg-white/[0.07] hover:text-white${rail}`}
          title={address}
        >
          <MapPin strokeWidth={1.5} className={`${ico} ${icoIdle}`} />
          <span className={`whitespace-nowrap ${hideLabel}`}>{isAr ? 'زوروا معرضنا' : 'Visit Our Showroom'}</span>
          {collapsed && <Tip text={isAr ? 'زوروا معرضنا' : 'Visit Our Showroom'} />}
        </a>
      ) : (
        /* No showroom address in the admin yet: book a visit via the consultation form */
        <button
          type="button"
          onClick={() => {
            onNavigate?.();
            openConsultation();
          }}
          className={`${itemBase} text-white/80 hover:bg-white/[0.07] hover:text-white text-start${rail}`}
        >
          <MapPin strokeWidth={1.5} className={`${ico} ${icoIdle}`} />
          <span className={`whitespace-nowrap ${hideLabel}`}>{isAr ? 'زوروا معرضنا' : 'Visit Our Showroom'}</span>
          {collapsed && <Tip text={isAr ? 'زوروا معرضنا' : 'Visit Our Showroom'} />}
        </button>
      )}
      <button
        type="button"
        onClick={() => {
          onNavigate?.();
          openConsultation();
        }}
        className={`${itemBase} text-white/80 hover:bg-white/[0.07] hover:text-white text-start${rail}`}
      >
        <MessageSquareText strokeWidth={1.5} className={`${ico} ${icoIdle}`} />
        <span className={`whitespace-nowrap ${hideLabel}`}>{isAr ? 'استشارة تصميم' : 'Design Consultation'}</span>
        {collapsed && <Tip text={isAr ? 'استشارة تصميم' : 'Design Consultation'} />}
      </button>

      {collapsed ? (
        <button
          type="button"
          onClick={openConsultation}
          aria-label={isAr ? 'احجز استشارة تصميم' : 'Book a Design Consultation'}
          className="group relative mx-auto mt-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#B59460]/50 text-[#C9A96E] transition-colors hover:bg-[rgba(181,148,96,0.15)]"
        >
          <MessageSquareText strokeWidth={1.5} className="h-[18px] w-[18px]" />
          <Tip text={isAr ? 'احجز استشارة تصميم' : 'Book a Design Consultation'} />
        </button>
      ) : (
      <button
        type="button"
        onClick={() => {
          onNavigate?.();
          openConsultation();
        }}
        className="group mx-1 mt-4 rounded-[12px] border border-[#B59460]/45 bg-white/[0.03] px-3.5 py-3 text-start transition-colors duration-200 hover:border-[#B59460] hover:bg-[rgba(181,148,96,0.10)]"
      >
        <span className="block text-[12.5px] font-medium text-white/70">{isAr ? 'تحتاج مساعدة في الاختيار؟' : 'Need help choosing?'}</span>
        <span className="mt-1 flex items-center gap-1 text-[13px] font-bold text-[#C9A96E]">
          {isAr ? 'احجز استشارة تصميم' : 'Book a Design Consultation'}
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5">→</span>
        </span>
      </button>
      )}
    </nav>
  );
};

/** Desktop: flush navy sidebar under the header; collapsible to a 68px icon rail (saved in localStorage). */
export const SidebarNav: React.FC = () => {
  // Always starts as the icon rail; expands only via the toggle (not persisted).
  const [collapsed, setCollapsed] = useState(true);
  useEffect(() => {
    // Let width-measuring widgets (marquee, carousels) recompute during and after the transition.
    const ids = [0, 130, 280].map((ms) => window.setTimeout(() => window.dispatchEvent(new Event('resize')), ms));
    return () => ids.forEach(clearTimeout);
  }, [collapsed]);

  return (
    <aside
      data-collapsed={collapsed || undefined}
      className={`hidden lg:block shrink-0 self-start sticky top-[calc(var(--sf-header-h)+12px)] z-30 ms-3 mt-3 mb-3 transition-[width] duration-[250ms] ease-out ${
        collapsed ? 'w-[64px]' : 'w-[212px]'
      }`}
    >
      <div
        className={`bg-gradient-to-b from-[#0B2345] to-[#081A33] rounded-[16px] pt-3 pb-4 shadow-[0_10px_30px_-12px_rgba(11,35,69,0.45)] ring-1 ring-white/5 min-h-[calc(100vh-var(--sf-header-h)-24px)] ${
          collapsed ? 'px-2 overflow-visible' : 'px-2 max-h-[calc(100vh-var(--sf-header-h)-24px)] overflow-y-auto overflow-x-hidden sf-sidebar-scroll'
        }`}
      >
        <NavList collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      </div>
    </aside>
  );
};

/** Mobile/tablet: slide-out drawer with the same navigation plus account links. */
export const SidebarDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { language, setLanguage, t, wishlistCount, cartCount, setIsCartOpen, setIsWishlistOpen } = useShop();
  const accountLink = useAccountLink(language);
  if (!isOpen) return null;
  const isAr = language === 'ar';

  const quick = 'flex flex-col items-center gap-1 rounded-xl bg-white/[0.06] py-2.5 text-[11px] text-white/80 hover:bg-white/10';

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
      <div onClick={onClose} className="absolute inset-0 bg-[#071A35]/60 backdrop-blur-[2px] sf-fade" />
      <div className="sf-drawer absolute inset-y-0 start-0 flex w-[86%] max-w-[340px] flex-col bg-gradient-to-b from-[#0B2345] to-[#081A33] text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          <Link href="/" onClick={onClose} aria-label="Sofalora">
            <BrandLogo size="sm" variant="light" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label={isAr ? 'إغلاق' : 'Close menu'}
            className="sf-round-btn h-9 w-9 bg-white/10 hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto sf-sidebar-scroll px-3 py-4">
          <div className="mb-4 grid grid-cols-4 gap-2">
            <Link href={accountLink.href} onClick={onClose} className={quick}>
              <User className="h-4 w-4 text-[#D9C29A]" />
              <span className="truncate px-1">{accountLink.label}</span>
            </Link>
            <Link href="/orders" onClick={onClose} className={quick}>
              <PackageCheck className="h-4 w-4 text-[#D9C29A]" />
              <span>{isAr ? 'طلباتي' : 'Orders'}</span>
            </Link>
            <button type="button" onClick={() => { onClose(); setIsWishlistOpen(true); }} className={quick}>
              <Heart className="h-4 w-4 text-[#D9C29A]" />
              <span>{t('wishlist')}{wishlistCount > 0 ? ` (${wishlistCount})` : ''}</span>
            </button>
            <button type="button" onClick={() => { onClose(); setIsCartOpen(true); }} className={quick}>
              <ShoppingBag className="h-4 w-4 text-[#D9C29A]" />
              <span>{t('cart')}{cartCount > 0 ? ` (${cartCount})` : ''}</span>
            </button>
          </div>
          <NavList onNavigate={onClose} />
        </div>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Globe className="h-4 w-4" />
            <div className="ms-auto flex rounded-full bg-white/10 p-0.5">
              {(['en', 'ar'] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLanguage(l)}
                  className={`rounded-full px-3.5 py-1 text-[11px] font-bold transition-colors ${
                    language === l ? 'bg-[#B59460] text-[#0B2345]' : 'text-white/70'
                  }`}
                >
                  {l === 'en' ? 'EN' : 'عربي'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
