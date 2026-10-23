import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft, Ruler, ShieldCheck, Truck } from 'lucide-react';
import { PROMOTIONAL_BANNER } from '../../data/editorialData';
import { useShop } from '../../context/LanguageContext';

export const FullWidthPromoBanner: React.FC = () => {
  const { language, direction, openConsultation } = useShop();
  const isRTL = direction === 'rtl';

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      openConsultation();
    }
  };

  return (
    <section className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg bg-[#0F172A]">
          {/* Panoramic Background Image */}
          <div className="absolute inset-0">
            <img
              src={PROMOTIONAL_BANNER.image}
              alt={PROMOTIONAL_BANNER.title[language]}
              loading="lazy"
              className="w-full h-full object-cover object-center brightness-60 sm:brightness-70"
            />
            {/* Cinematic Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40 rtl:bg-gradient-to-l rtl:from-black/85 rtl:via-black/60 rtl:to-black/40" />
          </div>

          {/* Banner Content Container */}
          <div className="relative z-10 p-6 sm:p-10 md:p-14 lg:p-16 max-w-2xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#C8102E]/25 backdrop-blur-xs border border-[#C8102E]/40 text-[#E8D9B6] text-[10px] sm:text-xs font-semibold tracking-widest uppercase"
            >
              <span>{PROMOTIONAL_BANNER.badge[language]}</span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white font-normal leading-tight drop-shadow-md mb-3 sm:mb-4"
            >
              {PROMOTIONAL_BANNER.title[language]}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs sm:text-sm md:text-base text-[#DAD5CA] font-light leading-relaxed mb-6 sm:mb-8"
            >
              {PROMOTIONAL_BANNER.subtitle[language]}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <button
                onClick={() => scrollToSection('window-decor')}
                className="px-6 py-3 rounded-full bg-white hover:bg-[#F0EDE6] text-[#101828] text-xs sm:text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
              >
                <span>{PROMOTIONAL_BANNER.cta[language]}</span>
                {isRTL ? (
                  <ArrowLeft className="w-4 h-4 text-[#0A2A5E] transition-transform duration-300 group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-[#0A2A5E] transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </button>

              <button
                onClick={openConsultation}
                className="px-5 py-3 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-xs text-white text-xs sm:text-sm font-semibold border border-white/30 transition-all duration-300"
              >
                <span>{PROMOTIONAL_BANNER.secondaryCta[language]}</span>
              </button>
            </motion.div>

            {/* Micro Feature Highlights Strip */}
            <div className="mt-8 sm:mt-10 pt-6 border-t border-white/15 grid grid-cols-3 gap-3 sm:gap-6 text-white/90">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs">
                <Ruler className="w-4 h-4 text-[#C8102E] shrink-0" />
                <span className="line-clamp-1">{language === 'ar' ? 'قياس ليزري مجاني' : 'Laser Measurement'}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs">
                <Truck className="w-4 h-4 text-[#C8102E] shrink-0" />
                <span className="line-clamp-1">{language === 'ar' ? 'توصيل داخل الرياض' : 'Free Delivery in Riyadh'}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs">
                <ShieldCheck className="w-4 h-4 text-[#C8102E] shrink-0" />
                <span className="line-clamp-1">{language === 'ar' ? 'ضمان ١٠ سنوات' : '10-Year Guarantee'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
