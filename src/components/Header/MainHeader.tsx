import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../../context/LanguageContext';
import { useRouter, Link } from '../../context/RouterContext';
import { PRODUCTS } from '../../data/products';
import { Search, Heart, ShoppingBag, User, X, Menu, ArrowRight, ArrowLeft, History, Sparkles, TrendingUp } from 'lucide-react';
import { BrandLogo } from '../UI/BrandLogo';

interface MainHeaderProps {
  onOpenMobileMenu: () => void;
}

const STORAGE_KEY_RECENT_SEARCHES = 'sofalora_recent_searches';

const POPULAR_SEARCHES = [
  { en: 'Cloud Sectional Sofa', ar: 'كنبة سحابة مقسمة' },
  { en: 'Majlis Floor Seating', ar: 'جلسة مجلس أرضية' },
  { en: 'Bouclé Accent Chair', ar: 'كرسي بوكليه' },
  { en: 'Blackout Curtains', ar: 'ستائر معتمة' },
  { en: 'Belgian Linen Drapes', ar: 'ستائر كتان بلجيكي' }
];

export const MainHeader: React.FC<MainHeaderProps> = ({ onOpenMobileMenu }) => {
  const {
    language,
    direction,
    setLanguage,
    toggleLanguage,
    t,
    cartCount,
    cartTotal,
    formatPrice,
    setIsCartOpen,
    wishlistCount,
    setIsWishlistOpen
  } = useShop();

  const { navigate } = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartBadgeScale, setCartBadgeScale] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const prevCartCountRef = useRef(cartCount);

  // Recent searches state
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RECENT_SEARCHES);
      return saved ? JSON.parse(saved) : ['كنب مقسم', 'مجلس', 'ستائر معتمة'];
    } catch {
      return ['كنب مقسم', 'مجلس', 'ستائر معتمة'];
    }
  });

  // Track scroll position for compact header
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled((window.scrollY || document.documentElement.scrollTop) > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate cart badge when quantity updates
  useEffect(() => {
    if (cartCount !== prevCartCountRef.current) {
      prevCartCountRef.current = cartCount;
      setCartBadgeScale(true);
      const timer = setTimeout(() => setCartBadgeScale(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const saveRecentSearch = (term: string) => {
    const clean = term.trim();
    if (!clean) return;
    setRecentSearches((prev) => {
      const updated = [clean, ...prev.filter((item) => item.toLowerCase() !== clean.toLowerCase())].slice(0, 5);
      try {
        localStorage.setItem(STORAGE_KEY_RECENT_SEARCHES, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(STORAGE_KEY_RECENT_SEARCHES);
    } catch {
      // ignore
    }
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (selectedIndex >= 0 && searchResults[selectedIndex]) {
      const selectedProduct = searchResults[selectedIndex];
      setIsSearchFocused(false);
      navigate(`/product/${selectedProduct.slug || selectedProduct.id}`);
      return;
    }
    if (searchTerm.trim()) {
      saveRecentSearch(searchTerm);
      setIsSearchFocused(false);
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // Filter products based on search query in both English and Arabic
  const searchResults = searchTerm.trim()
    ? PRODUCTS.filter((p) => {
        const query = searchTerm.toLowerCase();
        return (
          p.name.en.toLowerCase().includes(query) ||
          p.name.ar.includes(query) ||
          p.category.en.toLowerCase().includes(query) ||
          p.category.ar.includes(query) ||
          p.fabric.en.toLowerCase().includes(query) ||
          p.fabric.ar.includes(query) ||
          p.description.en.toLowerCase().includes(query) ||
          p.description.ar.includes(query)
        );
      }).slice(0, 6)
    : [];

  // Keyboard navigation inside search
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsSearchFocused(false);
      searchInputRef.current?.blur();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  // Close search popover on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div
      className={`bg-transparent border-b border-[#E6E2D9] transition-all duration-300 ${
        isScrolled ? 'py-1.5 sm:py-2' : 'py-3 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6 lg:gap-8">
          
          {/* Mobile Menu Toggle & Start Brand */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden shrink-0 p-1.5 sm:p-2 -ms-2 rounded-lg text-[#101828] hover:bg-[#E6E2D9]/60 transition-colors"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <Link href="/" className="group min-w-0 shrink-0" aria-label="Sofalora">
              <BrandLogo size="md" hideTaglineOnMobile />
            </Link>
          </div>

          {/* Center: Search Bar with Keyboard & Autocomplete */}
          <div ref={searchContainerRef} className="hidden md:block flex-1 max-w-xl relative">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedIndex(-1);
                }}
                onFocus={() => setIsSearchFocused(true)}
                onKeyDown={handleKeyDown}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-[#F3F1EB] text-[#101828] placeholder-[#667085] text-sm rounded-full py-2.5 ps-11 pe-10 border border-[#DDD8CD] focus:outline-none focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/20 transition-all shadow-2xs"
              />
              <Search className="w-4 h-4 text-[#667085] absolute start-4 pointer-events-none" />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedIndex(-1);
                    searchInputRef.current?.focus();
                  }}
                  className="absolute end-3 p-1 text-[#667085] hover:text-[#101828] transition-colors"
                  aria-label="Clear Search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Live Search Autocomplete Popover */}
            {isSearchFocused && (
              <div className="absolute top-full mt-2 inset-x-0 bg-white rounded-2xl shadow-xl border border-[#E2DED4] p-3.5 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                {searchTerm.trim().length > 0 ? (
                  searchResults.length > 0 ? (
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold text-[#667085] uppercase tracking-wider px-2.5 py-1 mb-1 border-b border-[#F3F1EB]">
                        <span>
                          {language === 'ar' ? `اقتراحات سريعة لـ "${searchTerm}"` : `Suggestions for "${searchTerm}"`}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleSearchSubmit()}
                          className="text-[#0A2A5E] hover:underline normal-case text-xs font-bold"
                        >
                          {language === 'ar' ? 'عرض كافة النتائج' : 'View all'}
                        </button>
                      </div>

                      <div className="divide-y divide-[#F3F1EB]/80">
                        {searchResults.map((product, idx) => (
                          <div
                            key={product.id}
                            onClick={() => {
                              saveRecentSearch(searchTerm);
                              setIsSearchFocused(false);
                              navigate(`/product/${product.slug || product.id}`);
                            }}
                            className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-colors ${
                              selectedIndex === idx
                                ? 'bg-[#F7F5F0] text-[#0A2A5E]'
                                : 'hover:bg-[#FAFAF8]'
                            }`}
                          >
                            <img
                              src={product.image}
                              alt={product.name[language]}
                              className="w-11 h-11 rounded-lg object-cover bg-[#F3F1EB] shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-[#101828] truncate">
                                {product.name[language]}
                              </p>
                              <p className="text-[11px] text-[#667085] truncate">
                                {product.category[language]} • {product.fabric[language]}
                              </p>
                            </div>
                            <div className="text-xs font-bold text-[#0A2A5E] font-serif shrink-0">
                              {formatPrice(product.price)}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2.5 border-t border-[#F3F1EB] mt-2">
                        <button
                          type="button"
                          onClick={() => handleSearchSubmit()}
                          className="w-full py-2 bg-[#F7F5F0] hover:bg-[#F2EEE7] text-[#101828] text-xs font-bold rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                        >
                          <span>{language === 'ar' ? 'عرض جميع النتائج المطابقة' : 'View all matching results'}</span>
                          <ArrowIcon className="w-3.5 h-3.5 text-[#0A2A5E]" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 text-center text-xs text-[#667085]">
                      <p className="font-semibold text-neutral-800 mb-1">
                        {t('noResults')} "{searchTerm}"
                      </p>
                      <p className="text-[11px] text-neutral-500">
                        {language === 'ar'
                          ? 'جرب البحث عن كنب، مجلس، بوكليه، أو ستائر معتمة'
                          : 'Try searching for Sofa, Majlis, Bouclé, or Blackout'}
                      </p>
                    </div>
                  )
                ) : (
                  /* Empty query: show Recent Searches & Popular Suggestions */
                  <div className="space-y-4">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-semibold text-[#667085] uppercase tracking-wider px-2 mb-2">
                          <span className="flex items-center gap-1.5">
                            <History className="w-3 h-3 text-[#0A2A5E]" />
                            {language === 'ar' ? 'عمليات البحث الأخيرة' : 'Recent Searches'}
                          </span>
                          <button
                            type="button"
                            onClick={clearRecentSearches}
                            className="text-[#8A847B] hover:text-[#C53030] text-[10px] lowercase transition-colors"
                          >
                            {language === 'ar' ? 'مسح السجل' : 'clear'}
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5 px-2">
                          {recentSearches.map((item, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => {
                                setSearchTerm(item);
                                saveRecentSearch(item);
                                setIsSearchFocused(false);
                                navigate(`/search?q=${encodeURIComponent(item)}`);
                              }}
                              className="px-3 py-1 bg-[#F3F1EB] hover:bg-[#E8E3DA] text-[#344054] text-xs rounded-full transition-colors font-medium flex items-center gap-1"
                            >
                              <span>{item}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Popular Searches */}
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#667085] uppercase tracking-wider px-2 mb-2">
                        <TrendingUp className="w-3 h-3 text-[#0A2A5E]" />
                        <span>{language === 'ar' ? 'الأكثر بحثاً في الرياض' : 'Popular in Riyadh'}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 px-2">
                        {POPULAR_SEARCHES.map((pop, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              const query = pop[language];
                              setSearchTerm(query);
                              saveRecentSearch(query);
                              setIsSearchFocused(false);
                              navigate(`/search?q=${encodeURIComponent(query)}`);
                            }}
                            className="text-start px-3 py-2 rounded-xl bg-[#FAFAF8] hover:bg-[#F2EEE7] border border-[#E8E3DA] text-xs font-semibold text-[#1F2937] transition-colors flex items-center justify-between"
                          >
                            <span className="truncate">{pop[language]}</span>
                            <ArrowIcon className="w-3 h-3 text-[#0A2A5E] opacity-70" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right/End: Language, Account, Wishlist & Cart */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">

            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="sm:hidden flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#DDD8CD] bg-[#F3F1EB]/90 text-[11px] font-bold text-[#101828] shadow-2xs transition-colors hover:border-[#C8102E] hover:text-[#0A2A5E]"
              aria-label={language === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
              title={language === 'en' ? 'العربية' : 'English'}
            >
              {language === 'en' ? 'AR' : 'EN'}
            </button>
            <div
              className="hidden sm:flex items-center rounded-full border border-[#DDD8CD] bg-[#F3F1EB]/90 p-0.5 shadow-2xs"
              role="group"
              aria-label={language === 'ar' ? 'اختيار اللغة' : 'Select language'}
            >
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`min-w-7 rounded-full px-2 py-1 text-[10px] font-bold uppercase transition-all ${
                  language === 'en'
                    ? 'bg-[#0A2A5E] text-white shadow-xs'
                    : 'text-[#475467] hover:text-[#0A2A5E]'
                }`}
                aria-pressed={language === 'en'}
                title="English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ar')}
                className={`min-w-7 rounded-full px-2 py-1 text-[10px] font-bold transition-all ${
                  language === 'ar'
                    ? 'bg-[#0A2A5E] text-white shadow-xs'
                    : 'text-[#475467] hover:text-[#0A2A5E]'
                }`}
                aria-pressed={language === 'ar'}
                title="العربية"
              >
                عربي
              </button>
            </div>

            {/* Account Link */}
            <Link
              href="/account"
              className="hidden lg:flex items-center gap-1.5 p-2 rounded-full hover:bg-[#E6E2D9]/50 text-[#101828] transition-colors"
              title={t('account')}
              aria-label={t('account')}
            >
              <User className="w-5 h-5 text-[#14284A]" />
              <span className="text-xs font-medium hidden xl:inline-block">{t('account')}</span>
            </Link>

            {/* Wishlist Button with Badge */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 rounded-full hover:bg-[#E6E2D9]/50 text-[#101828] transition-colors active:scale-95"
              title={t('wishlist')}
              aria-label={t('wishlist')}
            >
              <Heart className="w-5 h-5 text-[#14284A]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 -end-1 bg-[#0A2A5E] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-xs transition-transform duration-300">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button with Animated Badge and Subtotal */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#0A2A5E] hover:bg-[#061C3F] text-white px-3.5 py-2 rounded-full transition-all duration-200 shadow-xs group active:scale-95"
              title={t('cart')}
              aria-label={t('cart')}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#E3C98F] group-hover:scale-110 transition-transform duration-200" />
                {cartCount > 0 && (
                  <span
                    className={`absolute -top-2 -end-2.5 bg-[#C8102E] text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center transition-transform duration-300 ${
                      cartBadgeScale ? 'scale-125 bg-amber-300' : 'scale-100'
                    }`}
                  >
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold hidden sm:inline-block">
                {cartTotal > 0 ? formatPrice(cartTotal) : t('cart')}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden relative">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-[#F3F1EB] text-[#101828] placeholder-[#667085] text-xs rounded-full py-2.5 ps-9 pe-8 border border-[#DDD8CD] focus:outline-none focus:border-[#C8102E]"
            />
            <Search className="w-3.5 h-3.5 text-[#667085] absolute start-3 top-3 pointer-events-none" />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute end-2.5 top-2.5 p-0.5 text-[#667085]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Mobile Popover */}
          {isSearchFocused && (
            <div className="absolute top-full mt-2 inset-x-0 bg-white rounded-xl shadow-xl border border-[#E2DED4] p-3 z-50">
              {searchTerm.trim().length > 0 ? (
                searchResults.length > 0 ? (
                  <div className="divide-y divide-[#F3F1EB]">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          saveRecentSearch(searchTerm);
                          setIsSearchFocused(false);
                          navigate(`/product/${product.slug || product.id}`);
                        }}
                        className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#FAFAF8] cursor-pointer"
                      >
                        <img
                          src={product.image}
                          alt={product.name[language]}
                          className="w-10 h-10 rounded-md object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate text-[#101828]">
                            {product.name[language]}
                          </p>
                          <p className="text-[11px] text-[#0A2A5E] font-bold">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleSearchSubmit}
                        className="w-full py-2 bg-[#F7F5F0] text-[#101828] text-xs font-semibold rounded-lg text-center"
                      >
                        {language === 'ar' ? 'عرض كافة النتائج' : 'View all results'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="py-4 text-center text-xs text-[#667085]">
                    {t('noResults')} "{searchTerm}"
                  </p>
                )
              ) : (
                /* Mobile recent suggestions */
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-[#667085]">
                    {language === 'ar' ? 'الأكثر طلباً' : 'Popular'}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {POPULAR_SEARCHES.slice(0, 3).map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSearchTerm(item[language]);
                          saveRecentSearch(item[language]);
                          setIsSearchFocused(false);
                          navigate(`/search?q=${encodeURIComponent(item[language])}`);
                        }}
                        className="px-2.5 py-1 bg-[#F3F1EB] text-[11px] font-medium rounded-full text-[#344054]"
                      >
                        {item[language]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
