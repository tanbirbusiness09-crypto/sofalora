import React from 'react';
import { useShop } from '../../context/LanguageContext';
import { MessageSquare, Calendar, Phone, Sparkles } from 'lucide-react';

export const ConsultationCTA: React.FC = () => {
  const { language, t, openConsultation } = useShop();

  return (
    <section id="consultation" className="py-14 sm:py-20 bg-[#FAFAF8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0A2344] to-[#0A2A5E] text-white p-8 sm:p-12 lg:p-16 text-center border border-[#344054] shadow-2xl overflow-hidden">
          
          {/* Ambient Gold Glows */}
          <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-[#C8102E]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#344054] border border-[#4B5563] text-[#E3C98F] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>{t('consultationEyebrow')}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif-luxury tracking-tight text-white leading-tight">
              {t('consultationTitle')}
            </h2>

            <p className="text-sm sm:text-base text-[#B8B2A8] leading-relaxed">
              {t('consultationDescription')}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
              
              {/* Primary: Book Consultation */}
              <button
                onClick={openConsultation}
                className="inline-flex items-center gap-2 bg-[#C8102E] hover:bg-[#E3C98F] text-[#0A2A5E] px-7 py-3.5 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Calendar className="w-4 h-4 text-[#0A2A5E]" />
                <span>{t('bookConsultation')}</span>
              </button>

              {/* Secondary: WhatsApp Concierge */}
              <a
                href="https://wa.me/966559821100?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%AA%D9%81%D8%B5%D9%8A%D9%84%20%D8%A7%D9%84%D8%B3%D8%AA%D8%A7%D8%A6%D8%B1%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#4ADE80] border border-[#25D366]/40 px-6 py-3.5 rounded-full text-sm font-bold transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t('whatsAppChat')}</span>
              </a>

              {/* Direct Call */}
              <a
                href="tel:+966114829900"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/15 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-[#C8102E]" />
                <span>{t('talkToExpert')}</span>
              </a>

            </div>

            <div className="pt-4 text-xs text-[#667085]">
              {language === 'ar'
                ? 'المستشار يزورك في أي حي بالرياض مع عينات الأقمشة والسكك بدون أي التزام بالشراء'
                : 'Our specialist visits your Riyadh location with fabric books with zero purchase obligation'}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
