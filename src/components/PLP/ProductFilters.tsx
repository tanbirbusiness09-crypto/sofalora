import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X, RotateCcw, Check, Sparkles } from 'lucide-react';
import { FilterState, Category } from '../../types';
import { useShop } from '../../context/LanguageContext';

interface ProductFiltersProps {
  categories: Category[];
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
  totalResultsCount?: number;
}

const AVAILABLE_COLORS = [
  { id: 'white', name: { en: 'White & Off-White', ar: 'أبيض وسكري' }, hex: '#FFFFFF', border: true },
  { id: 'beige', name: { en: 'Beige & Sand', ar: 'بيج ورملي' }, hex: '#E2D5C3' },
  { id: 'taupe', name: { en: 'Warm Taupe', ar: 'توب رمادي' }, hex: '#8F8275' },
  { id: 'gold', name: { en: 'Royal Gold', ar: 'ذهبي ملكي' }, hex: '#D4AF37' },
  { id: 'green', name: { en: 'Saudi Emerald', ar: 'أخضر زمردي' }, hex: '#1C3B2B' },
  { id: 'blue', name: { en: 'Midnight Blue', ar: 'أزرق كحلي' }, hex: '#1B263B' },
  { id: 'grey', name: { en: 'Silver & Charcoal', ar: 'فضي وفحمي' }, hex: '#555555' },
  { id: 'black', name: { en: 'Obsidian Black', ar: 'أسود مطفي' }, hex: '#1A1A1A' }
];

const LIGHT_CONTROLS = [
  { id: 'blackout', label: { en: '100% Total Blackout', ar: 'عازل تام للضوء ١٠٠٪' } },
  { id: 'room-darkening', label: { en: 'Room Darkening', ar: 'تعتيم الغرفة' } },
  { id: 'light-filtering', label: { en: 'Light Filtering', ar: 'ترشيح الضوء الطبيعي' } },
  { id: 'sheer', label: { en: 'Translucent Sheer', ar: 'شيفون شفاف ناعم' } }
];

const FABRICS = [
  { id: 'velvet', label: { en: 'Royal Velvet', ar: 'مخمل ملكي' } },
  { id: 'linen', label: { en: 'Natural Flax Linen', ar: 'كتان نقي طبيعي' } },
  { id: 'voile', label: { en: 'Italian Organza & Voile', ar: 'فوال وشيفون إيطالي' } },
  { id: 'jacquard', label: { en: 'Woven Jacquard', ar: 'جاكار مطرز' } },
  { id: 'blackout-weave', label: { en: 'Triple Thermal Weave', ar: 'نسيج حراري ثلاثي' } },
  { id: 'aluminum', label: { en: 'Aircraft Aluminum', ar: 'ألمنيوم مسحوب' } }
];

const ROOMS = [
  { id: 'majlis', label: { en: 'Majlis & Formal Salon', ar: 'المجلس وصالون الضيوف' } },
  { id: 'bedroom', label: { en: 'Master Bedroom', ar: 'غرفة النوم الرئيسية' } },
  { id: 'living', label: { en: 'Living Room', ar: 'غرفة المعيشة اليومية' } },
  { id: 'dining', label: { en: 'Dining Area', ar: 'صالة الطعام' } },
  { id: 'office', label: { en: 'Office & Workspaces', ar: 'المكاتب وبيئات العمل' } }
];

const PRICE_BRACKETS = [
  { label: { en: 'Under 300 SAR', ar: 'أقل من ٣٠٠ ر.س' }, min: 0, max: 300 },
  { label: { en: '300 – 500 SAR', ar: '٣٠٠ – ٥٠٠ ر.س' }, min: 300, max: 500 },
  { label: { en: '500 – 750 SAR', ar: '٥٠٠ – ٧٥٠ ر.س' }, min: 500, max: 750 },
  { label: { en: '750+ SAR', ar: 'أكثر من ٧٥٠ ر.س' }, min: 750, max: 2000 }
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  filters,
  onFilterChange,
  onResetFilters,
  isMobileDrawer = false,
  onCloseMobileDrawer,
  totalResultsCount = 0
}) => {
  const { language } = useShop();

  // Section collapse states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    categories: true,
    price: true,
    lightControl: true,
    colors: true,
    fabrics: true,
    rooms: false
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeFiltersCount =
    (filters.categories.length > 0 ? 1 : 0) +
    (filters.colors.length > 0 ? 1 : 0) +
    (filters.fabrics.length > 0 ? 1 : 0) +
    (filters.lightControls.length > 0 ? 1 : 0) +
    (filters.rooms.length > 0 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.onSaleOnly ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 1200 ? 1 : 0);

  // Category toggle
  const handleCategoryToggle = (slug: string) => {
    const updated = filters.categories.includes(slug)
      ? filters.categories.filter((c) => c !== slug)
      : [...filters.categories, slug];
    onFilterChange({ ...filters, categories: updated });
  };

  // Color toggle
  const handleColorToggle = (colorId: string) => {
    const updated = filters.colors.includes(colorId)
      ? filters.colors.filter((c) => c !== colorId)
      : [...filters.colors, colorId];
    onFilterChange({ ...filters, colors: updated });
  };

  // Fabric toggle
  const handleFabricToggle = (fabricId: string) => {
    const updated = filters.fabrics.includes(fabricId)
      ? filters.fabrics.filter((f) => f !== fabricId)
      : [...filters.fabrics, fabricId];
    onFilterChange({ ...filters, fabrics: updated });
  };

  // Light control toggle
  const handleLightControlToggle = (lcId: string) => {
    const updated = filters.lightControls.includes(lcId)
      ? filters.lightControls.filter((l) => l !== lcId)
      : [...filters.lightControls, lcId];
    onFilterChange({ ...filters, lightControls: updated });
  };

  // Room toggle
  const handleRoomToggle = (roomId: string) => {
    const updated = filters.rooms.includes(roomId)
      ? filters.rooms.filter((r) => r !== roomId)
      : [...filters.rooms, roomId];
    onFilterChange({ ...filters, rooms: updated });
  };

  const handlePriceBracketClick = (min: number, max: number) => {
    onFilterChange({ ...filters, priceRange: [min, max] });
  };

  return (
    <div className={`flex flex-col h-full ${isMobileDrawer ? 'p-5' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#EBE5DB]">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-[#1C1A17] text-lg">
            {language === 'ar' ? 'تصفية المنتجات' : 'Filters'}
          </span>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#A9803C] text-white text-xs font-semibold">
              {activeFiltersCount}
            </span>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs text-[#8E8377] hover:text-[#A9803C] flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{language === 'ar' ? 'إعادة ضبط' : 'Reset All'}</span>
          </button>
        )}

        {isMobileDrawer && onCloseMobileDrawer && (
          <button
            type="button"
            onClick={onCloseMobileDrawer}
            className="p-1.5 text-[#554D43] hover:text-black rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Filter Body */}
      <div className="flex-1 overflow-y-auto py-4 space-y-6 divide-y divide-[#F0EBE3]">
        {/* Quick Toggles: In Stock & On Sale */}
        <div className="pt-2 space-y-2.5">
          <label className="flex items-center justify-between text-xs text-[#3A342D] cursor-pointer group">
            <span className="group-hover:text-[#A9803C] transition-colors">
              {language === 'ar' ? 'المتوفر في المخزون فقط' : 'In Stock Only'}
            </span>
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => onFilterChange({ ...filters, inStockOnly: e.target.checked })}
              className="w-4 h-4 rounded text-[#A9803C] focus:ring-[#A9803C] accent-[#A9803C] cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between text-xs text-[#3A342D] cursor-pointer group">
            <span className="flex items-center gap-1.5 group-hover:text-[#A9803C] transition-colors">
              <Sparkles className="w-3 h-3 text-[#A9803C]" />
              {language === 'ar' ? 'العروض والتخفيضات فقط' : 'On Sale Items Only'}
            </span>
            <input
              type="checkbox"
              checked={filters.onSaleOnly}
              onChange={(e) => onFilterChange({ ...filters, onSaleOnly: e.target.checked })}
              className="w-4 h-4 rounded text-[#A9803C] focus:ring-[#A9803C] accent-[#A9803C] cursor-pointer"
            />
          </label>
        </div>

        {/* Categories */}
        <div className="pt-4">
          <button
            type="button"
            onClick={() => toggleSection('categories')}
            className="w-full flex items-center justify-between text-sm font-bold text-[#1C1A17] mb-3"
          >
            <span>{language === 'ar' ? 'الأقسام الرئيسية' : 'Categories'}</span>
            {openSections.categories ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openSections.categories && (
            <div className="space-y-2">
              {categories.map((cat) => {
                const isSelected = filters.categories.includes(cat.slug);
                return (
                  <label
                    key={cat.id}
                    className="flex items-center justify-between text-xs text-[#524B42] hover:text-[#1C1A17] cursor-pointer py-1"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleCategoryToggle(cat.slug)}
                        className="w-4 h-4 rounded text-[#A9803C] focus:ring-[#A9803C] accent-[#A9803C] cursor-pointer"
                      />
                      <span>{cat.title[language]}</span>
                    </div>
                    <span className="text-[11px] text-[#998F84]">({cat.itemCount})</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="pt-4">
          <button
            type="button"
            onClick={() => toggleSection('price')}
            className="w-full flex items-center justify-between text-sm font-bold text-[#1C1A17] mb-3"
          >
            <span>{language === 'ar' ? 'نطاق السعر (ر.س)' : 'Price Range (SAR)'}</span>
            {openSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openSections.price && (
            <div>
              {/* Quick Brackets */}
              <div className="grid grid-cols-2 gap-1.5 mb-3">
                {PRICE_BRACKETS.map((b, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePriceBracketClick(b.min, b.max)}
                    className={`px-2.5 py-1.5 text-[11px] rounded-lg border transition-all truncate ${
                      filters.priceRange[0] === b.min && filters.priceRange[1] === b.max
                        ? 'bg-[#1C1A17] text-white border-[#1C1A17] font-semibold'
                        : 'border-[#E2DAD0] text-[#554D43] hover:border-[#A9803C]'
                    }`}
                  >
                    {b.label[language]}
                  </button>
                ))}
              </div>

              {/* Slider / Range Labels */}
              <div className="flex items-center justify-between text-xs text-[#7A7165] pt-1">
                <span>{filters.priceRange[0]} SAR</span>
                <span>{filters.priceRange[1]} SAR</span>
              </div>
              <input
                type="range"
                min={0}
                max={1000}
                step={25}
                value={filters.priceRange[1]}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    priceRange: [filters.priceRange[0], Number(e.target.value)]
                  })
                }
                className="w-full h-1.5 bg-[#E2DAD0] rounded-lg appearance-none cursor-pointer accent-[#A9803C] mt-2"
              />
            </div>
          )}
        </div>

        {/* Light Control */}
        <div className="pt-4">
          <button
            type="button"
            onClick={() => toggleSection('lightControl')}
            className="w-full flex items-center justify-between text-sm font-bold text-[#1C1A17] mb-3"
          >
            <span>{language === 'ar' ? 'درجة حجب الضوء' : 'Light Control'}</span>
            {openSections.lightControl ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openSections.lightControl && (
            <div className="space-y-2">
              {LIGHT_CONTROLS.map((lc) => {
                const isSelected = filters.lightControls.includes(lc.id);
                return (
                  <label
                    key={lc.id}
                    className="flex items-center gap-2 text-xs text-[#524B42] hover:text-[#1C1A17] cursor-pointer py-1"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleLightControlToggle(lc.id)}
                      className="w-4 h-4 rounded text-[#A9803C] focus:ring-[#A9803C] accent-[#A9803C] cursor-pointer"
                    />
                    <span>{lc.label[language]}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Colors Swatches */}
        <div className="pt-4">
          <button
            type="button"
            onClick={() => toggleSection('colors')}
            className="w-full flex items-center justify-between text-sm font-bold text-[#1C1A17] mb-3"
          >
            <span>{language === 'ar' ? 'اللون المفضل' : 'Color Palette'}</span>
            {openSections.colors ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openSections.colors && (
            <div className="grid grid-cols-4 gap-2 pt-1">
              {AVAILABLE_COLORS.map((col) => {
                const isSelected = filters.colors.includes(col.id);
                return (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => handleColorToggle(col.id)}
                    title={col.name[language]}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                      isSelected
                        ? 'border-[#A9803C] bg-[#FAF6F0] shadow-sm'
                        : 'border-[#EAE3D8] hover:border-[#C4B8A6]'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        col.border ? 'border border-black/20' : ''
                      }`}
                      style={{ backgroundColor: col.hex }}
                    >
                      {isSelected && (
                        <Check className={`w-3.5 h-3.5 ${col.id === 'white' ? 'text-black' : 'text-white'}`} />
                      )}
                    </div>
                    <span className="text-[10px] text-[#635A50] truncate max-w-full">
                      {col.name[language].split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Fabrics */}
        <div className="pt-4">
          <button
            type="button"
            onClick={() => toggleSection('fabrics')}
            className="w-full flex items-center justify-between text-sm font-bold text-[#1C1A17] mb-3"
          >
            <span>{language === 'ar' ? 'نوع القماش والخامة' : 'Fabric Type'}</span>
            {openSections.fabrics ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openSections.fabrics && (
            <div className="space-y-2">
              {FABRICS.map((fab) => {
                const isSelected = filters.fabrics.includes(fab.id);
                return (
                  <label
                    key={fab.id}
                    className="flex items-center gap-2 text-xs text-[#524B42] hover:text-[#1C1A17] cursor-pointer py-1"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleFabricToggle(fab.id)}
                      className="w-4 h-4 rounded text-[#A9803C] focus:ring-[#A9803C] accent-[#A9803C] cursor-pointer"
                    />
                    <span>{fab.label[language]}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Rooms Suitability */}
        <div className="pt-4">
          <button
            type="button"
            onClick={() => toggleSection('rooms')}
            className="w-full flex items-center justify-between text-sm font-bold text-[#1C1A17] mb-3"
          >
            <span>{language === 'ar' ? 'الغرفة المناسبة' : 'Room Suitability'}</span>
            {openSections.rooms ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openSections.rooms && (
            <div className="space-y-2">
              {ROOMS.map((rm) => {
                const isSelected = filters.rooms.includes(rm.id);
                return (
                  <label
                    key={rm.id}
                    className="flex items-center gap-2 text-xs text-[#524B42] hover:text-[#1C1A17] cursor-pointer py-1"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleRoomToggle(rm.id)}
                      className="w-4 h-4 rounded text-[#A9803C] focus:ring-[#A9803C] accent-[#A9803C] cursor-pointer"
                    />
                    <span>{rm.label[language]}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Sticky Mobile Apply Button */}
      {isMobileDrawer && (
        <div className="pt-4 mt-auto border-t border-[#EBE5DB]">
          <button
            type="button"
            onClick={onCloseMobileDrawer}
            className="w-full py-3.5 bg-[#1C1A17] hover:bg-[#A9803C] text-white font-semibold text-sm rounded-xl transition-colors shadow-md"
          >
            {language === 'ar'
              ? `عرض النتائج (${totalResultsCount})`
              : `Show Results (${totalResultsCount})`}
          </button>
        </div>
      )}
    </div>
  );
};
