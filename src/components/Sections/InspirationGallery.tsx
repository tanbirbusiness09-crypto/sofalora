import React, { useState } from 'react';
import { useShop } from '../../context/LanguageContext';
import { INSPIRATION_ITEMS } from '../../data/products';
import { InspirationItem } from '../../types';
import { Eye, X, Sparkles, MapPin } from 'lucide-react';

export const InspirationGallery: React.FC = () => {
  const { language, t } = useShop();
  const [selectedItem, setSelectedItem] = useState<InspirationItem | null>(null);

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-[#8C6B32] uppercase tracking-widest block mb-2">
            {language === 'ar' ? 'معرض المشاريع الواقعية بالرياض' : 'Riyadh Interior Lookbook'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#191715] font-serif-luxury tracking-tight">
            {t('inspirationTitle')}
          </h2>
          <p className="text-sm sm:text-base text-[#6E645A] mt-2">
            {t('inspirationSubtitle')}
          </p>
        </div>

        {/* 6 Photo Bento / Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {INSPIRATION_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-3xl overflow-hidden aspect-4/3 sm:aspect-square bg-[#EAE3D8] cursor-pointer shadow-2xs hover:shadow-xl transition-all duration-500"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title[language]}
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Hover Dark Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 sm:p-6 text-white" />

              {/* Tag (Always visible top) */}
              <div className="absolute top-3.5 start-3.5">
                <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                  {item.room[language]}
                </span>
              </div>

              {/* Hover Details (Appears on hover) */}
              <div className="absolute bottom-0 inset-x-0 p-5 text-white transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h4 className="text-base sm:text-lg font-bold font-serif-luxury leading-tight">
                  {item.title[language]}
                </h4>
                <p className="text-xs text-[#EAD8B8] mt-1 font-medium">
                  {item.curtainModel[language]}
                </p>

                <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-white">
                  <Eye className="w-3.5 h-3.5 text-[#C49E5D]" />
                  <span>{t('viewInspiration')}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Inspiration Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative max-w-3xl w-full bg-[#1C1A17] text-white rounded-3xl overflow-hidden shadow-2xl border border-[#3A352F]">
            
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 end-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-16/10 w-full overflow-hidden bg-black">
              <img
                src={selectedItem.image}
                alt={selectedItem.title[language]}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#C49E5D] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{selectedItem.room[language]} • {selectedItem.style[language]}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-white">
                {selectedItem.title[language]}
              </h3>

              <div className="pt-2 border-t border-[#38322B] flex flex-wrap items-center justify-between gap-4 text-xs text-[#C4B9AA]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C49E5D]" />
                  <span>{language === 'ar' ? 'مشروع سكني منجز في مدينة الرياض' : 'Completed Residential Project in Riyadh'}</span>
                </div>

                <div className="bg-[#2C2722] border border-[#443D36] px-3.5 py-1.5 rounded-xl font-bold text-[#EAD8B8]">
                  {selectedItem.curtainModel[language]}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
