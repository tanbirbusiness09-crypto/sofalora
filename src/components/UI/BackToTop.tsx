import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useShop } from '../../context/LanguageContext';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { language } = useShop();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          
          setIsVisible(scrollY > 380);

          if (totalHeight > 0) {
            const progress = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
            setScrollProgress(progress);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={language === 'ar' ? 'الرجوع إلى أعلى الصفحة' : 'Scroll back to top'}
      className="fixed bottom-6 start-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1B211D] text-[#E6B183] hover:bg-[#8F3E24] hover:text-white shadow-lg border border-[#8F3E24]/30 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#8F3E24]"
    >
      {/* Subtle Progress Ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-[#3D3833]"
        />
        <circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          stroke="#B85C3A"
          strokeWidth="2.5"
          strokeDasharray={132}
          strokeDashoffset={132 - (132 * scrollProgress) / 100}
          strokeLinecap="round"
          className="transition-all duration-150"
        />
      </svg>
      <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
};
