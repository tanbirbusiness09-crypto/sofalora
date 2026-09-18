import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../../context/LanguageContext';
import { useRouter, Link } from '../../context/RouterContext';
import { PRODUCTS } from '../../data/products';
import { Search, Heart, ShoppingBag, User, X, Menu, ArrowRight, ArrowLeft, History, Sparkles, TrendingUp } from 'lucide-react';

interface MainHeaderProps {
  onOpenMobileMenu: () => void;
}

const STORAGE_KEY_RECENT_SEARCHES = 'mohammad_curtains_recent_searches';

const POPULAR_SEARCHES = [
  { en: 'Hotel Blackout Curtains', ar: 'ستائر بلاك أوت فندقية' },
  { en: 'Soft S-Wave Sheer', ar: 'شيفون انسيابي ويف' },
  { en: 'Thermal Roller Blinds', ar: 'رول عازل للحرارة والشمس' },
  { en: 'Motorized Smart Tracks', ar: 'سكك ستائر ذكية بالريموت' },
  { en: 'Belgian Linen Drapes', ar: 'ستائر كتان بلجيكي طبيعي' }
];

export const MainHeader: React.FC<MainHeaderProps> = ({ onOpenMobileMenu }) => {
  const {
    language,
    direction,
    t,
    cartCount,
    cartTotal,
    formatPrice,
    setIsCartOpen,
    wishlistCount,
    setIsWishlistOpen,
    openQuickView
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
      return saved ? JSON.parse(saved) : ['بلاك أوت', 'ستائر ويف', 'شيفون تركي'];
    } catch {
      return ['بلاك أوت', 'ستائر ويف', 'شيفون تركي'];
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
      className={`bg-transparent border-b border-[#EBE3D8] transition-all duration-300 ${
        isScrolled ? 'py-1.5 sm:py-2' : 'py-3 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6 lg:gap-8">
          
          {/* Mobile Menu Toggle & Start Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 -ms-2 rounded-lg text-[#1C1A17] hover:bg-[#EBE3D8]/60 transition-colors"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand Logo & Name */}
            <Link href="/" className="flex flex-col group">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#1C1A17] font-serif-luxury transition-colors group-hover:text-[#A9803C]">
                {language === 'ar' ? 'ستائر محمد' : 'MOHAMMAD CURTAINS'}
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#8C7A6B] font-medium -mt-0.5">
                {language === 'ar' ? 'الرياض • تفصيل وديكور النوافذ الفاخرة' : 'RIYADH • BESPOKE WINDOW COUTURE'}
              </span>
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
                className="w-full bg-[#F4EFEA] text-[#1C1A17] placeholder-[#8A8075] text-sm rounded-full py-2.5 ps-11 pe-10 border border-[#E0D6C8] focus:outline-none focus:border-[#C49E5D] focus:ring-2 focus:ring-[#C49E5D]/20 transition-all shadow-2xs"
              />
              <Search className="w-4 h-4 text-[#8A8075] absolute start-4 pointer-events-none" />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedIndex(-1);
                    searchInputRef.current?.focus();
                  }}
                  className="absolute end-3 p-1 text-[#8A8075] hover:text-[#1C1A17] transition-colors"
                  aria-label="Clear Search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Live Search Autocomplete Popover */}
            {isSearchFocused && (
              <div className="absolute top-full mt-2 inset-x-0 bg-white rounded-2xl shadow-xl border border-[#E7DFD5] p-3.5 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                {searchTerm.trim().length > 0 ? (
                  searchResults.length > 0 ? (
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold text-[#8C7A6B] uppercase tracking-wider px-2.5 py-1 mb-1 border-b border-[#F4EFEA]">
                        <span>
                          {language === 'ar' ? `اقتراحات سريعة لـ "${searchTerm}"` : `Suggestions for "${searchTerm}"`}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleSearchSubmit()}
                          className="text-[#A9803C] hover:underline normal-case text-xs font-bold"
                        >
                          {language === 'ar' ? 'عرض كافة النتائج' : 'View all'}
                        </button>
                      </div>

                      <div className="divide-y divide-[#F4EFEA]/80">
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
                                ? 'bg-[#FAF6F0] text-[#A9803C]'
                                : 'hover:bg-[#FAF8F5]'
                            }`}
                          >
                            <img
                              src={product.image}
                              alt={product.name[language]}
                              className="w-11 h-11 rounded-lg object-cover bg-[#F4EFEA] shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-[#1C1A17] truncate">
                                {product.name[language]}
                              </p>
                              <p className="text-[11px] text-[#8C7A6B] truncate">
                                {product.category[language]} • {product.fabric[language]}
                              </p>
                            </div>
                            <div className="text-xs font-bold text-[#A9803C] font-serif shrink-0">
                              {formatPrice(product.price)}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2.5 border-t border-[#F4EFEA] mt-2">
                        <button
                          type="button"
                          onClick={() => handleSearchSubmit()}
                          className="w-full py-2 bg-[#FAF6F0] hover:bg-[#F3ECE0] text-[#1C1A17] text-xs font-bold rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                        >
                          <span>{language === 'ar' ? 'عرض جميع النتائج المطابقة' : 'View all matching results'}</span>
                          <ArrowIcon className="w-3.5 h-3.5 text-[#A9803C]" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 text-center text-xs text-[#8C7A6B]">
                      <p className="font-semibold text-neutral-800 mb-1">
                        {t('noResults')} "{searchTerm}"
                      </p>
                      <p className="text-[11px] text-neutral-500">
                        {language === 'ar'
                          ? 'جرب البحث عن بلاك أوت، شيفون، ويف، أو تفصيل خاص'
                          : 'Try searching for Blackout, Sheer, Wave, or Custom tailoring'}
                      </p>
                    </div>
                  )
                ) : (
                  /* Empty query: show Recent Searches & Popular Suggestions */
                  <div className="space-y-4">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-semibold text-[#8C7A6B] uppercase tracking-wider px-2 mb-2">
                          <span className="flex items-center gap-1.5">
                            <History className="w-3 h-3 text-[#A9803C]" />
                            {language === 'ar' ? 'عمليات البحث الأخيرة' : 'Recent Searches'}
                          </span>
                          <button
                            type="button"
                            onClick={clearRecentSearches}
                            className="text-[#998F84] hover:text-[#C53030] text-[10px] lowercase transition-colors"
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
                              className="px-3 py-1 bg-[#F5EFE8] hover:bg-[#EAE1D3] text-[#3D362F] text-xs rounded-full transition-colors font-medium flex items-center gap-1"
                            >
                              <span>{item}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Popular Searches */}
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#8C7A6B] uppercase tracking-wider px-2 mb-2">
                        <TrendingUp className="w-3 h-3 text-[#A9803C]" />
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
                            className="text-start px-3 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F3ECE0] border border-[#EAE2D5] text-xs font-semibold text-[#292623] transition-colors flex items-center justify-between"
                          >
                            <span className="truncate">{pop[language]}</span>
                            <ArrowIcon className="w-3 h-3 text-[#A9803C] opacity-70" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right/End: Account, Wishlist & Cart */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Account Link */}
            <Link
              href="/orders"
              className="hidden lg:flex items-center gap-1.5 p-2 rounded-full hover:bg-[#EBE3D8]/50 text-[#1C1A17] transition-colors"
              title={t('account')}
              aria-label={t('account')}
            >
              <User className="w-5 h-5 text-[#2C2824]" />
              <span className="text-xs font-medium hidden xl:inline-block">{t('account')}</span>
            </Link>

            {/* Wishlist Button with Badge */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 rounded-full hover:bg-[#EBE3D8]/50 text-[#1C1A17] transition-colors active:scale-95"
              title={t('wishlist')}
              aria-label={t('wishlist')}
            >
              <Heart className="w-5 h-5 text-[#2C2824]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 -end-1 bg-[#A9803C] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-xs transition-transform duration-300">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button with Animated Badge and Subtotal */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#1C1A17] hover:bg-[#2C2824] text-white px-3.5 py-2 rounded-full transition-all duration-200 shadow-xs group active:scale-95"
              title={t('cart')}
              aria-label={t('cart')}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#D8BD88] group-hover:scale-110 transition-transform duration-200" />
                {cartCount > 0 && (
                  <span
                    className={`absolute -top-2 -end-2.5 bg-[#C49E5D] text-[#1C1A17] text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center transition-transform duration-300 ${
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
              className="w-full bg-[#F4EFEA] text-[#1C1A17] placeholder-[#8A8075] text-xs rounded-full py-2.5 ps-9 pe-8 border border-[#E0D6C8] focus:outline-none focus:border-[#C49E5D]"
            />
            <Search className="w-3.5 h-3.5 text-[#8A8075] absolute start-3 top-3 pointer-events-none" />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute end-2.5 top-2.5 p-0.5 text-[#8A8075]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Mobile Popover */}
          {isSearchFocused && (
            <div className="absolute top-full mt-2 inset-x-0 bg-white rounded-xl shadow-xl border border-[#E7DFD5] p-3 z-50">
              {searchTerm.trim().length > 0 ? (
                searchResults.length > 0 ? (
                  <div className="divide-y divide-[#F4EFEA]">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          saveRecentSearch(searchTerm);
                          setIsSearchFocused(false);
                          navigate(`/product/${product.slug || product.id}`);
                        }}
                        className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#FAF8F5] cursor-pointer"
                      >
                        <img
                          src={product.image}
                          alt={product.name[language]}
                          className="w-10 h-10 rounded-md object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate text-[#1C1A17]">
                            {product.name[language]}
                          </p>
                          <p className="text-[11px] text-[#A9803C] font-bold">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleSearchSubmit}
                        className="w-full py-2 bg-[#FAF6F0] text-[#1C1A17] text-xs font-semibold rounded-lg text-center"
                      >
                        {language === 'ar' ? 'عرض كافة النتائج' : 'View all results'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="py-4 text-center text-xs text-[#8C7A6B]">
                    {t('noResults')} "{searchTerm}"
                  </p>
                )
              ) : (
                /* Mobile recent suggestions */
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-[#8C7A6B]">
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
                        className="px-2.5 py-1 bg-[#F4EFEA] text-[11px] font-medium rounded-full text-[#3D362F]"
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
