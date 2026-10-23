import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { CURATED_COLLECTION } from '../../data/editorialData';
import { useShop } from '../../context/LanguageContext';

export const CuratedCollectionSection: React.FC = () => {
  const { language, direction, openConsultation } = useShop();
  const isRTL = direction === 'rtl';

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#F3F1EB]/60 border-y border-[#E8E3DA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Subtle Eyebrow */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-3 sm:gap-6 mb-2">
            <span className="h-px w-10 sm:w-20 bg-[#D0C9BC]/80" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#8A6A2F] uppercase">
              {CURATED_COLLECTION.eyebrow[language]}
            </span>
            <span className="h-px w-10 sm:w-20 bg-[#D0C9BC]/80" aria-hidden="true" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#101828] font-normal tracking-tight">
            {CURATED_COLLECTION.title[language]}
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-[#475467] max-w-xl mx-auto font-light">
            {CURATED_COLLECTION.description[language]}
          </p>
        </div>

        {/* 2-Column Split: Large Image on one side, collection grid on the other */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (Right in RTL): Large Hero Lifestyle Image (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 25 : -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative group rounded-2xl overflow-hidden aspect-4/3 sm:aspect-16/10 shadow-sm bg-[#E4DFD4]"
          >
            <img
              src={CURATED_COLLECTION.heroImage}
              alt={CURATED_COLLECTION.title[language]}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
            />
            {/* Subtle Gradient Floor */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-4 start-4 end-4 sm:bottom-6 sm:start-6 sm:end-6 p-4 sm:p-5 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 shadow-md flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#8A6A2F] font-semibold mb-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'أقمشة مستدامة ١٠٠٪' : '100% Sustainable Looms'}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#101828] font-medium">
                  {language === 'ar'
                    ? 'كتان وألياف بلجيكية محاكة بمقاييس الفلل السعودية'
                    : 'Belgian raw flax tailored for radiant desert light'}
                </p>
              </div>

              <button
                onClick={openConsultation}
                className="shrink-0 px-4 py-2 rounded-lg bg-[#0A2A5E] hover:bg-[#061C3F] text-[#E8D9B6] hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>{CURATED_COLLECTION.cta[language]}</span>
                {isRTL ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
              </button>
            </div>
          </motion.div>

          {/* Right Column (Left in RTL): 3 Editorial Feature Cards (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -25 : 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {CURATED_COLLECTION.items.map((item, idx) => (
              <div
                key={item.id}
                onClick={openConsultation}
                className="group cursor-pointer p-3 sm:p-4 rounded-xl bg-white border border-[#EAE6DE] hover:border-[#D0C9BC] hover:shadow-md transition-all duration-300 flex items-center gap-4"
              >
                {/* Square Image Thumbnail */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0 bg-[#E4DFD4]">
                  <img
                    src={item.image}
                    alt={item.title[language]}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] sm:text-xs font-semibold text-[#8A6A2F] tracking-wider uppercase">
                    {item.tag[language]}
                  </span>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#101828] group-hover:text-[#0A2A5E] transition-colors truncate mt-0.5">
                    {item.title[language]}
                  </h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F1EDE5]">
                    <span className="text-xs font-bold text-[#101828]">
                      {item.price}
                    </span>
                    <span className="text-xs text-[#667085] group-hover:text-[#0A2A5E] font-medium flex items-center gap-1 transition-colors">
                      <span>{language === 'ar' ? 'عرض النمط' : 'View Style'}</span>
                      {isRTL ? (
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                      ) : (
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Bottom Value Note */}
            <div className="mt-2 p-3 rounded-xl bg-[#EAE6DE]/60 border border-[#DED9CE] flex items-center gap-2.5 text-[11px] sm:text-xs text-[#475467]">
              <CheckCircle2 className="w-4 h-4 text-[#8A6A2F] shrink-0" />
              <span>
                {language === 'ar'
                  ? 'يتوفر عينات مجانية للأقمشة مع خبير التصميم خلال موعد أخذ المقاسات في الرياض.'
                  : 'Complimentary physical fabric swatches brought to your Riyadh home during measurement.'}
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
