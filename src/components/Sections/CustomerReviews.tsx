import React, { useState } from 'react';
import { useShop } from '../../context/LanguageContext';
import { TESTIMONIALS } from '../../data/products';
import { Star, ChevronRight, ChevronLeft, Quote, BadgeCheck } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const { language, direction, t } = useShop();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];
  const NextIcon = direction === 'rtl' ? ChevronLeft : ChevronRight;
  const PrevIcon = direction === 'rtl' ? ChevronRight : ChevronLeft;

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <span className="text-xs font-bold text-[#8C6B32] uppercase tracking-widest block mb-2">
            {language === 'ar' ? 'ثقة عملاؤنا في الرياض' : 'Riyadh Client Endorsements'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#191715] font-serif-luxury tracking-tight">
            {t('reviewsTitle')}
          </h2>
          <p className="text-sm sm:text-base text-[#6E645A] mt-2">
            {t('reviewsSubtitle')}
          </p>
        </div>

        {/* Carousel Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E7DFD5] shadow-xl relative">
          
          <Quote className="w-12 h-12 text-[#EAE3D8] absolute top-6 end-8 pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
            
            {/* Avatar & Verifications */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name[language]}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-[#FAF8F5] shadow-md"
                />
                <span className="absolute bottom-0 end-0 bg-[#C49E5D] text-white p-1 rounded-full shadow-xs">
                  <BadgeCheck className="w-4 h-4" />
                </span>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 text-[#C49E5D] mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

            {/* Testimonial Quote & Info */}
            <div className="flex-1 text-center md:text-start space-y-4">
              
              <p className="text-base sm:text-lg lg:text-xl text-[#2C2824] leading-relaxed font-serif-luxury italic">
                "{currentTestimonial.comment[language]}"
              </p>

              <div className="pt-2 border-t border-[#F4EFEA] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold text-[#1C1A17]">
                    {currentTestimonial.name[language]}
                  </h4>
                  <p className="text-xs text-[#8C7A6B]">
                    {currentTestimonial.role[language]} • {currentTestimonial.location[language]}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs text-[#A9803C] font-semibold bg-[#FAF8F5] px-3 py-1.5 rounded-full border border-[#EAE3D8] self-center sm:self-auto">
                  <span>{t('installedIn')}:</span>
                  <span className="font-bold">{currentTestimonial.curtainInstalled[language]}</span>
                </div>
              </div>

            </div>

          </div>

          {/* Carousel Controls */}
          <div className="mt-8 pt-6 border-t border-[#F2ECE3] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx ? 'w-8 bg-[#C49E5D]' : 'w-2 bg-[#D5C9B8]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-[#D5C9B8] hover:border-[#C49E5D] hover:bg-[#FAF8F5] flex items-center justify-center text-[#1C1A17] transition-all"
                aria-label="Previous Review"
              >
                <PrevIcon className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-[#D5C9B8] hover:border-[#C49E5D] hover:bg-[#FAF8F5] flex items-center justify-center text-[#1C1A17] transition-all"
                aria-label="Next Review"
              >
                <NextIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
